import { Component }  from 'react';
import '../App.css';
import storage  from '../data';
import 'firebase/storage';

export default class Realtime extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image : "",
     imageUrl : "",
     progress: '',
    }
  }

  
  
  handleImgae = (e) => {
    let name =e.target.files[0];
    this.setState({[e.target.name]:name});
  }

  handleSubmit = (e)  =>  {
      e.preventDefault();
    if(this.state.image === '' ) {
        console.error(`not an image, the image file is a ${typeof(this.state.image)}`)
      }
      else {
        // sed image to firebase
          const uploadTask = storage.ref(`/images/${this.state.image.name}`).put(this.state.image);
          console.log(uploadTask);
          //initiates the firebase side uploading 
          uploadTask.on('state-changed',(snapShot) => {
            //takes a snap shot of the process as it is happening
            const progress = Math.round((snapShot.bytesTransferred / snapShot.totalBytes) * 100);
            this.setState(prevObject => ({progress:progress}));
            
          }, (err) => {
            //catches the errors
            console.log(err)
          }, () => {
            // gets the functions from storage refences the image storage in firebase by the children
            // gets the download url then sets the image from firebase as the value for the imgUrl key:
           storage.ref('images').child(this.state.image.name).getDownloadURL()
             .then(fireBaseUrl => {
               this.setState(prevObject => ({...prevObject, imageUrl: fireBaseUrl}))
            });
          })
        }
      }

          render () {
            return (
              <>
              
                <form>
                  <br/>
                    
                  <img src = {this.state.imageUrl} alt='image' width='180' height='150' />
                  <br/>
                  <h1>{this.state.progress}</h1>
                  <br/>
                <input type="file" name='image' placeholder='drop or select image' alt='no image' onChange={this.handleImgae} />
                <br/>
                <button type='submit' onClick={this.handleSubmit}>Upload</button>
                </form>
                </>
            );
        }

 
}
