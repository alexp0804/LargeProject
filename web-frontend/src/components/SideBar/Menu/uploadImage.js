

const UploadImage = (props) =>
{

    const app_name = 'reci-pin';

    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
            return 'https://' + app_name + '.herokuapp.com/' + route;
        else
            return 'http://localhost:5000/' + route;
    }

    const handleImageUpload = async (event) =>
    {
        let base64String = "";

        let { files } = event.target;

        let file = files[0]
        let fileType = file['type']

        console.log(file['type'])
        var reader = new FileReader();


        let cool;
          
        reader.onload = async function () {
            base64String = reader.result.replace("data:", "")
                .replace(/^.+,/, "");

            cool = base64String.slice();
            //console.log(cool)
            
            let string = `data:${fileType};base64,`+ cool;

            window.localStorage.setItem('pic', string);
    
            // let jsonPayLoad = JSON.stringify({pic: string});
            //console.log(jsonPayLoad)
    
            // try
            // {
            //     const response = await fetch(buildPath("api/uploadImage"), {
            //         method: "POST",
            //         body: jsonPayLoad,
            //         headers: {
            //           "Content-Type": "application/json",
            //           "x-access-token": JSON.parse(
            //             window.localStorage.getItem("userObject")
            //           )["token"],
            //         },
            //       });
        
            //     console.log(await response);
            
            // }
            // catch(e)
            // {
            //     console.log("get fucked")
            //     console.log(e)
            // }
        }

        reader.readAsDataURL(file);


    }

    return(
        <div>
            <label htmlFor="file">
                Image
                <input
                    type = "file"
                    name = "file"
                    placeholder = "Upload an image"
                    onChange = {handleImageUpload}
                >
                </input>
            </label>
        </div>
    );
    
}

export default UploadImage