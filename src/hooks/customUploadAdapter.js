import axios from "@/axios";
// function imgCutdown(file) {
//   return new Promise((resolve) => {
//     const render = new FileReader();
//     render.onload = function (progress) {
//       const target = progress.target;
//       if (!target) return;

//       const reuslt = target.result;
//       if (typeof reuslt === "string") {
//         const image = new Image();
//         image.src = reuslt;
//         image.onload = function () {
//           const h = 800;
//           const rate = h / image.height;
//           const canvas = document.createElement("canvas");
//           const context = canvas.getContext("2d");
//           if (!context) return;
//           canvas.width = image.width * rate;
//           canvas.height = h;
//           context.drawImage(
//             image,
//             0,
//             0,
//             image.width,
//             image.height,
//             0,
//             0,
//             canvas.width,
//             canvas.height
//           );
//           canvas.toBlob(
//             function (b) {
//               const file = new File([b], "pic", {
//                 type: "image/jpeg",
//               });
//               resolve(file);
//             },
//             "image/jpeg",
//             0.5
//           );
//         };
//       }
//     };
//     render.readAsDataURL(file);
//   });
// }

// 上传图片的地址，我这里使用的是vue的环境变量，也可以直接写死

// 自定义适配器类
class MyUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }

  async upload() {
    return this.loader.file.then(
      (file) =>
        new Promise((resolve) => {
          this.uploadFile(file, resolve);
        })
    );
  }

  async uploadFile(file, resolve) {
    const res = await axios.post(
      "/article/imgupload",
      {
        attachPic: file,
      },
      {
        isFormData: true,
      }
    );
    if (res.state === 0) return resolve({ default: res.result[0].url });
    else alert(res.error[0].message);
  }

  abort() {
    if (this.xhr) {
      this.xhr.abort();
    }
  }
}

export function MyCustomUploadAdapterPlugin(editor) {
  editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
    return new MyUploadAdapter(loader);
  };
}
