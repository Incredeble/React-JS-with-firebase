import { Component }  from 'react';
import '../App.css';
import storage  from '../data';
import Image from '../storageImage/Image';
import 'firebase/storage';

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video : '',
     videoUrl : '',
     progress: '',
     getDisable : false
    }
  }

  
  
  handleImgae = (e) => {
    let video = e.target.files[0];
    this.setState(prevObject => ({...prevObject,[e.target.name]:video}));
    console.log(video.name);
  }

  handleSubmit = (e)  =>  {
      e.preventDefault();
    if(this.state.video === '' ) {
        console.error(`not an video, the video file is a ${typeof(this.state.video)}`)
      }
      else {
        // sed video to firebase
          const uploadTask = storage.ref(`/videos/${this.state.video.name}`).put(this.state.video);
          console.log('Uploading Start');
          //initiates the firebase side uploading 

          uploadTask.on('state-changed',(snapShot) => {
            //takes a snap shot of the process as it is happening
            const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
            this.setState(prevObject => ({progress:progress}));
            
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            // gets the functions from storage refences the video storage in firebase by the children
            // gets the download url then sets the video from firebase as the value for the imgUrl key:
           storage.ref('videos').child(this.state.video.name).getDownloadURL()
             .then(fireBaseUrl => {
               this.setState(prevObject => ({...prevObject, videoUrl: fireBaseUrl.toString()}))
            });
          })
        }
      }

    arr = () => {
      if(this.state.videoUrl) {
        return <video loop autoPlay width='350' height='300'>
          
        <source src={this.state.videoUrl} type='video/mp4'  />
        your browser does not support video tag
      </video>
        
      }
      else {
        return <p>Loading</p>
      }
    }
     
          render () {
            return (
              <>
              { this.arr ()}
              
                <form>
                  
                  <h1>{this.state.progress}</h1>
                
                <input type="file" name='video' onChange={this.handleImgae} />
                
                <button type='submit' onClick={this.handleSubmit}>Upload</button>
                </form>
                <Image />
                </>
            );
        }

 
}
