const { toTitleCase, validateEmail } = require("../config/function");
const bcrypt = require("bcryptjs");
const userModel = require("../models/users");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/keys");

class Auth {
  async isAdmin(req, res) {
    let { loggedInUserId } = req.body;
    try {
      let loggedInUserRole = await userModel.findById(loggedInUserId);
      res.json({ role: loggedInUserRole.userRole });
    } catch {
      res.status(404);
    }
  }

  async allUser(req, res) {
    try {
      let allUser = await userModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  /* User Registration/Signup controller  */
  async postSignup(req, res) {
    let { name, email, password, cPassword } = req.body;
    let error = {};
    if (!name || !email || !password || !cPassword) {
      error = {
        ...error,
        name: "Filed must not be empty",
        email: "Filed must not be empty",
        password: "Filed must not be empty",
        cPassword: "Filed must not be empty",
      };
      return res.json({ error });
    }
    if (name.length < 3 || name.length > 25) {
      error = { ...error, name: "Name must be 3-25 charecter" };
      return res.json({ error });
    } else {
      if (validateEmail(email)) {
        name = toTitleCase(name);
        if ((password.length > 255) | (password.length < 8)) {
          error = {
            ...error,
            password: "Password must be 8 charecter",
            name: "",
            email: "",
          };
          return res.json({ error });
        } else {
          // If Email & Number exists in Database then:
          try {
            password = bcrypt.hashSync(password, 10);
            const data = await userModel.findOne({ email: email });
            if (data) {
              error = {
                ...error,
                password: "",
                name: "",
                email: "Email already exists",
              };
              return res.json({ error });
            } else {
              let newUser = new userModel({
                name,
                email,
                password,
                // ========= Here role 1 for admin signup role 0 for customer signup =========
                userRole: 0, // Field Name change to userRole from role
              });
              newUser
                .save()
                .then((data) => {
                  const token = jwt.sign(
                    { _id: data._id, role: data.userRole, email: data.email },
                    JWT_SECRET
                  );
                  const encode = jwt.verify(token, JWT_SECRET);
                  return res.json({
                    success: "Account created successfully.",
                    token: token,
                    user: encode,
                  });
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          } catch (err) {
            console.log(err);
          }
        }
      } else {
        error = {
          ...error,
          password: "",
          name: "",
          email: "Email is not valid",
        };
        return res.json({ error });
      }
    }
  }

  /* User Login/Signin controller  */
  async postSignin(req, res) {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        error: "Fields must not be empty",
      });
    }
    try {
      const data = await userModel.findOne({ email: email });
      if (!data) {
        return res.json({
          error: "Invalid email or password",
        });
      } else {
        const login = await bcrypt.compare(password, data.password);
        if (login) {
          const token = jwt.sign(
            { _id: data._id, role: data.userRole, email: data.email },
            JWT_SECRET
          );
          const encode = jwt.verify(token, JWT_SECRET);
          return res.json({
            token: token,
            user: encode,
          });
        } else {
          return res.json({
            error: "Invalid email or password",
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  async forgotPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.json({ error: "Email is required" });
    }
    try {
      const userModel = require("../models/users");
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.json({ error: "No user found with that email" });
      }

      const crypto = require("crypto");
      const token = crypto.randomBytes(20).toString("hex");
      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
      await user.save();

      const nodemailer = require("nodemailer");
      let transporter;
      
      if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        transporter = nodemailer.createTransport({
          service: process.env.EMAIL_SERVICE || "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        });
      } else {
        let testAccount = await nodemailer.createTestAccount().catch(() => null);
        if (testAccount) {
          transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
          });
        } else {
           transporter = {
             sendMail: async (opts) => {
               console.log("Mock Email Sent:", opts);
               return { messageId: "mock-id" };
             }
           }
        }
      }

      const resetUrl = `http://localhost:3000/reset-password/${token}`;

      const mailOptions = {
        from: '"E-Commerce Admin" <admin@ecommerce.com>',
        to: user.email,
        subject: "Password Reset Request",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; padding: 40px;">
            <h2 style="color: #111827; font-size: 24px; font-weight: 600; text-transform: uppercase;">Password Reset</h2>
            <p style="color: #4b5563; font-size: 16px; line-height: 1.5; margin-bottom: 24px;">
              You requested a password reset. Please click the button below to set a new password. This link will expire in 1 hour.
            </p>
            <a href="${resetUrl}" style="display: inline-block; background-color: #111827; color: #ffffff; text-decoration: none; padding: 14px 28px; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.05em;">
              Reset Password
            </a>
            <p style="color: #6b7280; font-size: 14px; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 24px;">
              If you did not request this, please ignore this email and your password will remain unchanged.
            </p>
            <p style="color: #6b7280; font-size: 12px; margin-top: 12px;">Reset Link: <a href="${resetUrl}">${resetUrl}</a></p>
          </div>
        `,
      };

      if (transporter.sendMail) {
        const info = await transporter.sendMail(mailOptions);
        if (nodemailer.getTestMessageUrl) {
           console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
        } else {
           console.log("Reset Link: ", resetUrl);
        }
      }

      return res.json({ success: "Password reset email sent." });

    } catch (err) {
      console.log(err);
      return res.json({ error: "Server error occurred. Please try again later." });
    }
  }

  async resetPassword(req, res) {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.json({ error: "All fields are required" });
    }
    try {
      const userModel = require("../models/users");
      const user = await userModel.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.json({ error: "Password reset token is invalid or has expired." });
      }

      const bcrypt = require("bcryptjs");
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpires = undefined;
      await user.save();

      return res.json({ success: "Password has been reset successfully." });
    } catch (err) {
      console.log(err);
      return res.json({ error: "Server error occurred" });
    }
  }
}

const authController = new Auth();
module.exports = authController;
