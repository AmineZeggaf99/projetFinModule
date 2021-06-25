const nlpTransformer= async (text,option)=>{



    const response=await fetch("http://127.0.0.1:5000/nlp", {
        method: 'POST',

        cache: 'no-cache',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body:JSON.stringify({
          text:text,
          option:option

        })

    });


    return  await response.json();


}
export default nlpTransformer;