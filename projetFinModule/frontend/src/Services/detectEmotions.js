const detectEmotions= async (text)=>{



    const response=await fetch("http://127.0.0.1:5000/detectEmotions", {
        method: 'POST',

        cache: 'no-cache',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body:JSON.stringify({
          text:text

        })

    });


    return  await response.json();


}
export default detectEmotions;