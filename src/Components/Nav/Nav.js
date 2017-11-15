import React, { Component } from 'react';
import './Nav.css';
import { Link } from 'react-router-dom';
import profileImg from './profilePlaceholder.png';
import gearImg from './gearIcon.png';

class Nav extends Component {
    constructor() {
        super();

        this.state = {
            toggleMenu: false,
            toggleGear: false,
            
        }
        this.toggleMenuFunc = this.toggleMenuFunc.bind(this);
        this.toggleGearFunc = this.toggleGearFunc.bind(this);
        this.toggleAllFalse = this.toggleAllFalse.bind(this);

    }

    toggleMenuFunc() {
        this.setState({
            toggleMenu: !this.state.toggleMenu,
            toggleGear: false,
            
        }, () => console.log('menu: ' + this.state.toggleMenu))
    }
    toggleGearFunc() {
        this.setState({
            toggleGear: !this.state.toggleGear,
            toggleMenu: false
        }, () => console.log('Gear: ' + this.state.toggleGear))
    }
    toggleAllFalse() {
        if (this.state.toggleGear || this.state.toggleMenu) {
            this.setState({
                toggleGear: false,
                toggleMenu: false
            })
        }

    }
    render() {
        return (
            <div className={this.state.toggleGear || this.state.toggleMenu ? 'NavHolder darkened' : 'NavHolder'} onClick={this.toggleAllFalse}>
                <div className='Nav'>

                 
                {/*===| Left Nav |=================================*/}
                    
                    <div className='leftNav navSection'>
                        <Link to='/profile'><img src={profileImg} alt='profile' className='profileIcon'/></Link>
                    </div>
                 
                {/*===| Center Nav |=================================*/}
                
                    <div className='centerNav navSection'>
                        <h2>W I P</h2>
                    </div>

                 
                {/*===| Right Nav |=================================*/}
                
                    <div className='rightNav navSection'>
                        {/* menu for admin - edit profile - logout */}
                        <div className={this.state.toggleGear ? 'gearMenu rotateGear': 'gearMenu '} onClick={this.toggleGearFunc}>
                            <img src={gearImg} alt='settings' className='gearIcon'/>
                    </div>
                        {/* menu for search */}
                        <div className='menu'>
                            <div className='mobileNav' onClick={this.toggleMenuFunc}>
                                <div className={this.state.toggleMenu ? "bar1 menuIcon" : "menuIcon"}></div>
                                <div className={this.state.toggleMenu ? "bar2 menuIcon" : "menuIcon"}></div>
                                <div className={this.state.toggleMenu ? "bar3 menuIcon" : "menuIcon"}></div>

                            </div>
                        </div>
                    </div>



                </div>
                {/* end of nav bar */}

                 
                {/*===| Gear Drop Down |=================================*/}
                
                <div className={this.state.toggleGear ? ' displayGearModal gearDropDown ' : 'hideGearModal gearDropDown'}>
                    <h3>ACCOUNT</h3>
                    <a>Edit Profile</a>
                    <h3>MANAGE</h3>
                    <Link to='/profile'>Edit Favorites</Link>

                    <Link to='/auth/logout'>Logout</Link>
                </div>

                 
                {/*===| Burger Menu Drop down |===========================*/}
                
                <div className={this.state.toggleMenu ? ' displayMenuModal menuDropDown ' : 'hideMenuModal menuDropDown'}>
                    <Link to='/searchcollege'>Colleges</Link>
                    <Link to='/searchjob'>Jobs</Link>
                    <Link to='/searchscholarship'>Scholarships</Link>
                </div>
            </div>
        )
    }
}
export default Nav;