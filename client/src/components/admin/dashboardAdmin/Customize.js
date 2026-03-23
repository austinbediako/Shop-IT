import React, { Fragment, useContext, useEffect, useState } from "react";
import { DashboardContext } from "./";
import { uploadImage, sliderImages, deleteImage } from "./Action";

const apiURL = process.env.REACT_APP_API_URL;

const Customize = () => {
  const { data, dispatch } = useContext(DashboardContext);

  return (
    <Fragment>
      <div className="m-4 md:w-1/2">
        {!data.uploadSliderBtn ? (
          <div
            onClick={(e) =>
              dispatch({
                type: "uploadSliderBtn",
                payload: !data.uploadSliderBtn,
              })
            }
            style={{ background: "#303031" }}
            className="cursor-pointer rounded-none-none p-2 flex items-center justify-center text-gray-100 text-sm font-semibold uppercase"
          >
            <svg
              className="w-6 h-6 text-gray-100 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                clipRule="evenodd"
              />
            </svg>
            Customize Slider Image
          </div>
        ) : (
          ""
        )}
      </div>
      {data.uploadSliderBtn ? <UploadImageSection /> : ""}
    </Fragment>
  );
};

const UploadImageSection = () => {
  const { data, dispatch } = useContext(DashboardContext);
  const [errorInfo, setErrorInfo] = useState(false);

  const uploadImageHandler = async (image) => {
    let res = await uploadImage(image, dispatch);
    if (res && res.error) {
       setErrorInfo("Upload failed. The image might be too large (over 10MB limit) or the server encountered an error. Please try again with a smaller file.");
    } else {
       setErrorInfo(false);
    }
  };

  return (
    <Fragment>
      <div className="relative m-4 bg-white p-4 shadow-lg">
        <h1 className="border-b-2 border-yellow-700 mb-4 pb-2 text-2xl font-semibold">
          Shop Slider Images
        </h1>
        {errorInfo && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{errorInfo}</span>
            <span onClick={() => setErrorInfo(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer">
              <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}
        <div className="relative flex flex-col space-y-2">
          <div
            style={{ background: "#303031" }}
            className="relative z-0 px-4 py-2 rounded text-white flex justify-center space-x-2 md:w-4/12"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>{" "}
            <span>Upload File</span>
          </div>
          <input
            onChange={(e) => uploadImageHandler(e.target.files[0])}
            name="image"
            accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
            className="absolute z-10 opacity-0 bg-gray-100"
            type="file"
            id="image"
          />
        </div>
        <span
          onClick={(e) =>
            dispatch({
              type: "uploadSliderBtn",
              payload: !data.uploadSliderBtn,
            })
          }
          style={{ background: "#303031" }}
          className="cursor-pointer absolute top-0 right-0 m-4 rounded-full p-1"
        >
          <svg
            className="w-6 h-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </span>
        <AllImages />
      </div>
    </Fragment>
  );
};

const AllImages = () => {
  const { data, dispatch } = useContext(DashboardContext);

  useEffect(() => {
    sliderImages(dispatch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteImageReq = (id) => {
    deleteImage(id, dispatch);
  };

  return (
    <Fragment>
      {data.imageUpload ? (
        <div className="flex items-center justify-center p-8">
          <span className="loader"></span>
        </div>
      ) : (
        ""
      )}
      <div className="grid grid-cols-1 md:grid md:grid-cols-2 lg:grid-cols-3 my-4">
        {data.sliderImages.length > 0 ? (
          data.sliderImages.map((item, index) => {
            return (
              <div key={index} className="relative col-span-1 m-2 border">
                <img
                  className="w-full md:h-32 object-center object-cover"
                  src={item.slideImage.match(/^https?:\/\//) ? item.slideImage : `${apiURL}/uploads/customize/${item.slideImage}`}
                  alt="sliderImages"
                />
                <span
                  onClick={(e) => deleteImageReq(item._id)}
                  style={{ background: "#303031" }}
                  className="absolute top-0 right-0 m-1 text-white cursor-pointer rounded-none-none p-1"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            );
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-xl font-light w-full bg-orange-200 rounded-none py-2">
            No slide image found
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default Customize;
