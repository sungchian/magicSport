/**
 * 图片压缩处理，转换为等比的高800px的图像
 * @params file File类型的图片文件
 * @return Promise<file> 返回一个promise，值为一个压缩后的图片文件
 */
function imgCutdown(file) {
  return new Promise((resolve) => {
    const render = new FileReader();
    render.onload = function (progress) {
      const target = progress.target;
      if (!target) return;

      const reuslt = target.result;
      if (typeof reuslt === "string") {
        const image = new Image();
        image.src = reuslt;
        image.onload = function () {
          const h = 800;
          const rate = h / image.height;
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          if (!context) return;
          canvas.width = image.width * rate;
          canvas.height = h;
          context.drawImage(
            image,
            0,
            0,
            image.width,
            image.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
          canvas.toBlob(
            function (b) {
              const file = new File([b], "pic", {
                type: "image/jpeg",
              });
              resolve(file);
            },
            "image/jpeg",
            0.5
          );
        };
      }
    };
    render.readAsDataURL(file);
  });
}

// 上传图片的地址，我这里使用的是vue的环境变量，也可以直接写死
//const uploadUrl = `${process.env.VUE_APP_HOST}image/upload.do`;
const uploadUrl = "http://192.168.60.16:8887";
console.log(uploadUrl);
// 自定义适配器类
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve, reject) => {
          this._initRequest();
          this._initListeners(resolve, reject, file);
          this._sendRequest(file);
          //https://stackoverflow.com/questions/55105674/ckeditor-upload-adapter-sends-object-promise-to-server
        })
    );
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }

  _initRequest() {
    const xhr = (this.xhr = new XMLHttpRequest());

    xhr.open("POST", uploadUrl, true);
    xhr.responseType = "json";
  }

  _initListeners(resolve, reject, file) {
    const xhr = this.xhr;
    const loader = this.loader;
    const genericErrorText = `Couldn't upload file: ${file.name}.`;

    xhr.addEventListener("error", () => reject(genericErrorText));
    xhr.addEventListener("abort", () => reject());
    xhr.addEventListener("load", () => {
      const response = xhr.response;

      if (!response || response.error) {
        return reject(
          response && response.error ? response.error.message : genericErrorText
        );
      }

      resolve({
        default: response.url,
      });
    });

    if (xhr.upload) {
      xhr.upload.addEventListener("progress", (evt) => {
        if (evt.lengthComputable) {
          loader.uploadTotal = evt.total;
          loader.uploaded = evt.loaded;
        }
      });
    }
  }

  async _sendRequest(file) {
    const data = new FormData();

    // 判断如果上传图片大于1M，则进行压缩处理
    if (file.size > 1000 * 1024) {
      file = await imgCutdown(file);
    }

    // 上传参数就根据后端的处理而设置了
    data.append("file", file);
    data.append("name", file.name);
    data.append("group", "pic");
    console.log(data);
    this.xhr.send(data);
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
