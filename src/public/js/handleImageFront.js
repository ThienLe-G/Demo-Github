async function uploadImage(value) {
    const cloud_name = "duas1juqs";
    const upload_preset = "pnvimage";
    const fileInput = value;
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", upload_preset);
    const options = {
        method: "POST",
        body: formData,
    };


    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, options);
        const data = await response.json();
        const url = data.secure_url;
        return url;
    } catch (err) {
        console.error(err);
        throw err;
    }
}