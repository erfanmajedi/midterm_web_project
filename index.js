// as you can see in html script in linr 59 we have a clickon attribute which we call the below function
// so this function basically do its duties after we click the submit button 
// which is literally search the input id and fetch its json and do some other cool stuff

function clickFunc(){
    // document.getElementById('searchtext').value = "Your ID not Found !!!";\
    const element = document.getElementById('searchbutton');
    const searchtext = document.getElementById('searchtext');
    // here we convert the searched id to lower case
    const lowerCaseText = searchtext.value.toLowerCase();
    var user_id = lowerCaseText;
    // console.log(user_id)
    
    // here we check if the user click the submit when he/she have'nt been type an input 
    // so we show him/her a proper message
    if (searchtext.value == '') {
        searchtext.placeholder = "Please Enter an ID ..."
        searchtext.value = ""
        return
    }
    // we made this variable for furthermore duties 
    var url = "https://api.github.com/users/";
    // wanted url is the url we request to the github and fetch its json
    var wanted_url = url.concat(user_id);
    fetch(wanted_url)
        .then(result => result.json())
        .then((out) => {
            console.log(out)
            // here if the user id did not found we show a proper message to the user
            if (out['message'] == "Not Found") {
                lowerCaseText.placeholder = "Your ID not Found !!!"
                lowerCaseText.value = ""
                return
        }
        // when the user was correct we have to change the user's information so here we change the name 
        document.getElementById("user").innerHTML = out["name"];
        // here we change the blog
        const blog = document.getElementById("url")
        blog.innerHTML = out["blog"];
        blog.href = out["blog"]
        // here change the location
        document.getElementById("loc").innerHTML = out["location"];
        // here change the profile picture 
        document.getElementById("profile_img").src = out["avatar_url"]
        //let str = document.getElementsByClassName("bio").innerHTML;
        
        // here we first check if the bio of the user is not empty , replace \r\n with break then we change it
        let res = out["bio"]
        if (res != null) {
            res = res.replace('\r\n', '<br>')
        }
        document.getElementById("bio_text").innerHTML = res;
        // window.localStorage.clear()

        // from here we make a dictionary for local storage and put it there 
        let ditioncanary = {}
        ditioncanary["name"] = out["name"]
        ditioncanary['GithubID'] = out["login"]
        ditioncanary["blog"] = blog
        ditioncanary["location"] = out["location"]
        ditioncanary["picture_url"] = out['avatar_url']
        ditioncanary["bio"] = res
        window.localStorage.setItem(out["login"].toLowerCase(), JSON.stringify(ditioncanary))
        console.log(window.localStorage)
        // window.localStorage.setItem('GithubID', (out['login'].toLowerCase()))
        // window.localStorage.setItem('blog', out['blog'])
        // window.localStorage.setItem('location', out["location"])
        // window.localStorage.setItem("picture url", out["avatar_url"])
        // window.localStorage.setItem('bio', res)
        // console.log(window.localStorage)
        // if ()
        console.log('Output:', out);
        }).catch(error => console.error(error));
}