const detectFakeNews= async (news)=>{



    const response=await fetch("http://127.0.0.1:5000/detectFakeNews", {
        method: 'POST',

        cache: 'no-cache',

        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },

        body:JSON.stringify({
          news:news

        })

    });


    return  await response.json();


}
export default detectFakeNews;