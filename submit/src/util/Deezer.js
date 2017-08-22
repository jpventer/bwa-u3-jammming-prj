
const app_id = 249442;
const secret_key = 'ec6c516256b501b241f1e92d9ef8be52';
const app_name = 'jammming';
const redirect_uri = 'http://jpventerjammming.surge.sh';
const perms = 'basic_access,manage_library,delete_library,offline_access';
const deezerUrl = 'https://cors-anywhere.herokuapp.com/http://api.deezer.com/';
let userId;
let accessToken;
let expires;


const Deezer = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        }

        //2
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresMatch = window.location.href.match(/expires=([^&]*)/);
        if(accessTokenMatch){
           accessToken = accessTokenMatch[1];
           expires = expiresMatch[1];
            return accessToken;
        } else {
            const accessUrl = `https://connect.deezer.com/oauth/auth.php?app_id=${app_id}&redirect_uri=${redirect_uri}&perms=${perms}&response_type=token`;
            window.location = accessUrl;
        }
    },

    search(term){
       return fetch(deezerUrl + 'search?limit=8&q='+term).then( response => {
            return response.json();
        }).then( data => {
            if(data.length === 0){
                return [];
            }else{
               return data;
            }
        })
    },



    //get the user id http://api.deezer.com/user/me (id)
    //create a playlist
    //http://api.deezer.com/user/{user_id}/playlists/ POST title=value
    //get the playlist id 
    //http://api.deezer.com/user/me/playlists POST title = playlist title, return id
    //add tracks to playlist 
    //playlist/{playlist_id}/tracks comma seperated string of track ids
    savePlaylist(plName, plTracks){
        if(( plName !== "") || (plName !== undefined) && (plTracks !== undefined) || (plTracks.length !== 0) ){
            let _accessToken = Deezer.getAccessToken();
            console.log('sp' + _accessToken);
            let _userId = Deezer.getUserID();
           
            // create  a playList
           let newPlayListId;

           //check the playListName does not already exist, if yes return id, if no create
           fetch(deezerUrl + 'user/'+ _userId + '/playlists/' + '&access_token=' + accessToken).then(response => response.json() ).then(
               data => {
                   
                    if(data.length > 0 ){                        
                        //use some to test for first truthy, return boolean
                       for (var i=0; i<= data.length; i++){
                           if(data[i].title === plName){
                            newPlayListId = data[i].id;   
                            break;
                           }
                       }                   
                    }

                    return data;                    
               }
           )

           
           if(!newPlayListId){
            fetch(deezerUrl + 'user/'+ _userId + '/playlists/' + '&access_token=' + accessToken + 'request_method=POST&title=' + plName).then( response => {
                return response.json();
            }).then(data => {
                newPlayListId = data.id;
                return data.id;
            });
           }

           //add tracks to the playlist
           let trackIdsAsString = plTracks.join();
           console.log(trackIdsAsString);

           fetch(deezerUrl + '/playlist/'+ newPlayListId + '/tracks/' + '&access_token=' + accessToken + 'request_method=POST&songs=' + trackIdsAsString).then( response => {
               return response.json();
           }).then(data => {
               return data;
           });
            
        }
    },

    getUserID(){
        if(!userId){
            fetch(deezerUrl+ 'user/me' + '&access_token=' + accessToken).then(response => {                
                return response.json();     
            }).then( data => {
                if(data.length === 0){
                    return undefined;
                }else{                   
                    userId = data.id;
                    console.log(userId);
                    return data;
                }
            });
        }else{
            return userId;
        }
        
    }
}


export default Deezer;