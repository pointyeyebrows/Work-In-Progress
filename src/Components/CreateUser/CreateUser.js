import React, { Component } from 'react';
import './CreateUser.css';
import { connect } from 'react-redux';
import profilePlaceholder from '../Assets/profilePlaceholder.png';
import { getUserInfo } from '../../ducks/reducer.js';
import { Link } from 'react-router-dom';
// import { Image } from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

class CreateUser extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imgUrl: '',
            firstName: '',
            lastName: '',
            myEmail: '',
            // highschool: '',
            // currentYear: '',
            city: '',
            USstate: '',
            year: ['Freshman', 'Sophomore', 'Junior', 'Senior'],
            schoolInfo: [],
            filteredSchools: []
        }
        this.handleDrop = this.handleDrop.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.saveInfo = this.saveInfo.bind(this);
        this.highschoolApi = this.highschoolApi.bind(this);
        this.handleYearChange = this.handleYearChange.bind(this);
    }

    componentDidMount() {
        this.props.getUserInfo().then(() => {
            if (user.id) {
                this.setState({
                    imgUrl: user.img_url,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    myEmail: user.email,
                    highschool: user.high_school,
                    currentYear: user.current_year,
                    city: user.location_city,
                    USstate: user.location_state,
                    about: user.about,
                    
                })
            }    
        });
        const user = this.props.user;
        
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            formData.append("tags", `codeinfuse, medium, gist`);
            formData.append("upload_preset", "kgjwyzim"); // Replace the preset name with your own
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/dfkw5isvi/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                // const fileURL = data.secure_url // You should store this URL for future references in your app
                axios.get(data.secure_url).then(res => {
                    // console.log(res);
                    this.setState({
                        imgUrl: res.config.url
                    })
                })
            })


        })
        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            // ... perform after upload is successful operation

        });
    }

    updateSchool(value){
        this.setState({
            highschool: value
        }, this.handleSchoolSearch )
    }

    handleSTChange(value){
        this.setState({
            USstate: value
        }, this.highschoolApi )

    }

    highschoolApi() {
        if (this.state.city && this.state.USstate) {
            axios.get(`https://api.greatschools.org/schools/nearby?key=${process.env.REACT_APP_HIGHSCHOOL_KEY}&state=${this.state.USstate}&levelCode=high-schools&city=${this.state.city}&radius=30`)
                .then(response => {
                    let schoolNames = [];
                    response.data.schools.school.map((school, i) => {
                       return schoolNames.push(school.name)
                    })

                    this.setState({
                        schoolInfo: schoolNames
                    }, () => console.log('state schools', this.state.schoolInfo))
            
                })
        }        
    } 

    handleSchoolSearch(){
         var arr = [];
        //  for(var i = 0; i < this.state.schoolInfo.length; i++){
            
            this.state.schoolInfo.map( (school , i) => {
                if( school.name.toLowerCase().includes(this.state.highschool.toLowerCase()) ) {
                     arr.push( school )
            }})
            //  if(this.state.schoolInfo[i].(this.state.highschool)){
            //     arr.push( this.state.schooInfo[i] )
        this.setState({
            filteredSchools: arr
        })
         
// }
    }


    handleChange(prop, val) {
        this.setState({
            [prop]: val,

        })
    }

    saveInfo(id) {
        axios.put(`/api/saveuser/${id}`, this.state).then(res => {
            console.log('saveinfoRes', res)
        })
    }

    handleYearChange(value) {
        this.setState({
            currentYear: value
        })
    }

    handleSchoolChange(value) {
        this.setState({
            highschool: value
        } )
    }


    render() {


        // placeholder = { user.id ? user.first_name + ' ' + user.last_name : 'Full name' } value = { user.id ? user.first_name + ' ' + user.last_name : '' } 

        // placeholder = { user.id ? user.first_name + ' ' + user.last_name : 'example@gmail.com' } value = { user.id ? user.email : '' }

        //=====| Material-ui |==================================
        //  Name and email below picture
        const TextFieldName = () => (
            <div>
                <TextField
                    hintText=''

                    // user.id ? user.first_name :
                    // user.id ? user.last_name : 
                    // user.id ? user.email : 
                    // user.id ? user.high_school : 
                    // user.id ? user.current_year :
                    // user.id ? user.location_city :
                    // user.id ? user.location_state :
                    // hintText={user.id ? user.first_name + ' ' + user.last_name : this.state.fullName ? this.state.fullName : 'first and last'}
                    floatingLabelText="First name"
                    value={ this.state.firstName ? this.state.firstName : ''}
                    onChange={(e) => this.handleChange('firstName', e.target.value)}
                    style={{ width: 95}}
                /> <TextField
                    hintText=''
                    // hintText={user.id ? user.first_name + ' ' + user.last_name : this.state.fullName ? this.state.fullName : 'first and last'}
                    floatingLabelText="Last name"
                    value={this.state.lastName ? this.state.lastName : ''}
                    onChange={(e) => this.handleChange('lastName', e.target.value)}
                    style={{ width: 95 }}
                /> <br />

                <TextField
                    hintText="example@gmail.com"
                    floatingLabelText="Email"
                    value={this.state.myEmail ? this.state.myEmail : ''}
                    onChange={(e) => this.handleChange('myEmail', e.target.value)}
                    style={{ width: 200 }}
                /> <br />
            </div>
        )
        const TextFields = () => (
            <div>

                    <TextField
                    hintText=""
                    floatingLabelText="City"
                    value={ this.state.city ? this.state.city : ''}
                    onChange={(e) => this.handleChange('city', e.target.value)}
                    style={{ width: 200 }}
                /><br />
                <TextField
                    hintText=""
                    floatingLabelText="State"
                    value={ this.state.USstate ? this.state.USstate : ''}
                    onChange={(e) => this.handleSTChange( e.target.value)}
                    style={{ width: 200 }}
                />
                <br />
                {/* <TextField
                    hintText=""
                    floatingLabelText="Highschool"
                    value={this.state.highschool ? this.state.highschool : ''}
                    onChange={(e) => this.updateSchool( e.target.value)}
                    style={{ width: 200 }}
                /> */}
                 <AutoComplete
                    floatingLabelText="Highschool"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.schoolInfo}
                    value={this.state.schoolInfo ? this.state.schoolInfo: ''}
                    style={{ width: 200 }}
                    onNewRequest={ chosenRequest => this.handleSchoolChange(chosenRequest) }
                 />
                <br />
                <AutoComplete
                    floatingLabelText="Current Year"
                    filter={AutoComplete.caseInsensitiveFilter}
                    dataSource={this.state.year}
                    value={this.state.year ? this.state.year : ''}
                    style={{ width: 200 }}
                    onNewRequest={ chosenRequest => this.handleYearChange(chosenRequest) }
                 />
                {/* <TextField
                    hintText=""
                    floatingLabelText="Current year"
                    value={this.state.currentYear ? this.state.currentYear : ''}
                    onChange={(e) => this.handleChange('currentYear', e.target.value)}
                    style={{ width: 200 }}
                /> */}
                <br />
               
            </div>


        );

        //=====| DropZone |==================================
        const dropZoneStyles = {
            border: 'none'
        }
        const user = this.props.user;
        return (
            <div className='createuser'>
                <div className='createuserHolder'>


                    {/* create user section 1     */}
                    <div className='createuserSec1'>
                        <h1>{user.new_user ? 'Welcome to W I P' : 'Edit Profile'}</h1>
                    </div>
                    {/* left side of info -- profile pic */}



                    <div className='createuserSec2'>

                        <div className='createuserInfoHolder'>
                            <div className='infoItem profileImgDiv'>
                                {/*===| CLOUDINARY |=================================*/}


                                {/* DROPZONE */}
                                <Dropzone
                                    onDrop={this.handleDrop}
                                    multiple
                                    accept="image/*"
                                    style={dropZoneStyles}
                                ><img src={this.state.imgUrl ? this.state.imgUrl : profilePlaceholder} alt='profileimg' />

                                </Dropzone>
                                {/* <span>{user.id ? user.first_name + ' ' + user.last_name : 'name'} */}
                                {TextFieldName()}
                            </div>


                            {/*===| RIGHT SIDE OF INFO |=================================*/}
                            <div className='userInfo infoItem'>
                                {TextFields()}
                            </div>

                        </div>
                    </div> {/* End of createuserSec2 */}

                    <div className='createuserSec3'>
                        <div className={user.new_user ? 'hide' : 'editProfileBtnHolder cancelBtn'}>
                               
                            <Link to={'/loading'}><div><h3> Cancel </h3></div></Link>
                        </div>
                        <div className='editProfileBtnHolder'>

                            <Link to={'/loading'}><div onClick={() => this.saveInfo(user.id)}><h3> {user.new_user? 'Join now': 'Save'} </h3></div></Link>
                        </div>


                    </div>
                </div>

            </div>

        )
    }
}
function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, { getUserInfo })(CreateUser);