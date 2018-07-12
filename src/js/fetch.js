module.exports=(url,method,params1,callback,err=(err)=>{})=>{
    // let oCookie
    // if(cookie.userId){
    //   cookieStr={
    //     userId: cookie.userId
    //   }
    // }
    var myHeaders = new Headers({
      'User-Agent': 'SXJAPP',
      'Accept': 'application/json',
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    })
    if(method.toLowerCase()=='post'){
     fetch(url, {
              method:method,
              headers:myHeaders,
              // credentials:'omit',
              body:JSON.stringify(params1)
            })
            .then((response) => response.json())
            .then((responseData) => { 
              if(typeof responseData=='object'){
                callback(responseData)
              }
            })
            .catch((error) => { 
              err('网络错误!')
            })
           .done(); 
    }else{
      fetch(url, {
              method:method,
              mode: 'no-cors',
              headers: myHeaders
              // credentials:'omit',
            })
            .then((response) => response.json())
            .then((responseData) => { 
              if(typeof responseData=='object'){
                callback(responseData)
              }
            })
            .catch((error) => { 
              err('网络错误!')
              console.log(error);
            })
           .done();
    }
}