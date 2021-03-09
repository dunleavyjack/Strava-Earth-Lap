import { React, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { changeUnits } from '../actions'

const YourDistance = ({ userActivities: {runTotal, rideTotal, swimTotal}, userProfile, changeUnits, metric }) => {
    // Toggle between miles and kms. Deafult is kms
    const [isToggled, setToggled] = useState(false)
    
    const [unitsUsed, setUnitsUsed] = useState([])

    useEffect(() => {
        document.getElementById("flexSwitchCheckChecked").click()
        document.getElementsByClassName("redux-clicker")[0].click()
    }, [])

    const handleClick = () => {
        setToggled(!isToggled)
    }

    const handleReduxClick = () => {
        changeUnits()
    }




    const runDistance = () => {
        const { miles, kms } = runTotal
        return isToggled ? kms.toString() + " kms" : miles + " miles"
    }

    const rideDistance = () => {
        const { miles, kms } = rideTotal
        return isToggled ? kms.toString() + " kms" : miles + " miles"
    }

    const swimDistance = () => {
        const { miles, kms } = swimTotal
        return isToggled ? kms.toString() + " kms" : miles + " miles"
    }

    const runDistanceRedux = () => {
        const { miles, kms } = runTotal
        return metric ? kms.toString() + " kms" : miles + " miles"
    }

    const rideDistanceRedux = () => {
        const { miles, kms } = rideTotal
        return metric ? kms.toString() + " kms" : miles + " miles"
    }

    const swimDistanceRedux = () => {
        const { miles, kms } = swimTotal
        return metric ? kms.toString() + " kms" : miles + " miles"
    }

    const combinedDistance = () => {
        let result = 0
        if (unitsUsed.includes("running")) {
            result = result + parseInt(runDistance())
        }

        if (unitsUsed.includes("riding")) {
            result = result + parseInt(rideDistance())
        }

        if (unitsUsed.includes("swimming")) {
            result = result + parseInt(swimDistance())
        }
        return result
    }

    const addSport = (sport) => {
        setUnitsUsed([...unitsUsed, sport])
    }

    const removeSport = (sport) => {
        const newArray = unitsUsed.filter(unit => unit !== sport)
        setUnitsUsed(newArray)
    }

    const switchSport = (sport) => {
        if (unitsUsed.includes(sport)){
            removeSport(sport)
        } else {
            addSport(sport)
        }
    }


    return (
        <div>
            <h1>Hi, {userProfile.firstname}!</h1>
            <h4>Local State</h4>
            <p>Your running total: {runDistance()}</p>
            <p>Your riding total: {rideDistance()}</p>
            <p>Your swim total: {swimDistance()}</p>
            <p>Total: {combinedDistance()}</p>

            <button onClick={handleClick}>Convert</button>

            
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" onClick={() => switchSport("running")}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Running</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() => switchSport("riding")}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Riding</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() => switchSport("swimming")}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Swimming</label>
            </div>
            
            <br />
            
            <h4>Redux State</h4>
            <p>Your running total: {runDistanceRedux()}</p>
            <p>Your riding total: {rideDistanceRedux()}</p>
            <p>Your swim total: {swimDistanceRedux()}</p>
            <p>Total: {combinedDistance()}</p>

            <button onClick={handleReduxClick}>Convert with Redux</button>

            
            <div className="form-check form-switch">
                <input className="form-check-input redux-clicker" type="checkbox" id="flexSwitchCheckChecked" onClick={() => switchSport("running")}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Running</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() => switchSport("riding")}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Riding</label>
            </div>
            <div className="form-check form-switch">
                <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" onClick={() => switchSport("swimming")}/>
                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Swimming</label>
            </div>

        </div>
    )
}


const mapStateToProps = state => {
    return {
        userActivities: state.userActivities,
        userProfile: state.userProfile,
        metric: state.metric
    }
};

export default connect(mapStateToProps, {
    changeUnits
})(YourDistance)



