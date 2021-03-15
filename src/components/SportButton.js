import { React, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { changeUnits, addSport, removeSport, setTotalDistance } from '../actions'

const SportButton = ({ userActivities: { runTotal, rideTotal, swimTotal }, addSport, sports, metric, removeSport, setTotalDistance, text }) => {
    const [selected, setSelected] = useState(false)
    
    
    useEffect(() => {
        document.getElementsByClassName("redux-clicker")[0].click()
    }, [])

    const runDistance = () => {
        const { miles, kms } = runTotal
        return metric ? kms.toString() + " kms" : miles + " miles"
    }

    const rideDistance = () => {
        const { miles, kms } = rideTotal
        return metric ? kms.toString() + " kms" : miles + " miles"
    }

    const swimDistance = () => {
        const { miles, kms } = swimTotal
        return metric ? kms.toString() + " kms" : miles + " miles"
    }

    const combinedDistance = () => {
        let result = 0
        if (sports.includes("running")) {
            result = result + parseInt(runDistance())
        }

        if (sports.includes("riding")) {
            result = result + parseInt(rideDistance())
        }

        if (sports.includes("swimming")) {
            result = result + parseInt(swimDistance())
        }
        setTotalDistance(result)
        return result
    }
    combinedDistance()

    const toggleSport = sport => {
        if (sports.includes(sport)) {
            removeSport(sport)
        } else {
            addSport(sport)
        }
    }

    return (
        <>
            <button className="redux-clicker button-orange mt-3 mb-3" onClick={() => toggleSport(text)}>{text}</button>
        </>
    );
};

const mapStateToProps = state => {
    return {
        userActivities: state.userActivities,
        userProfile: state.userProfile,
        metric: state.metric,
        sports: state.sports,
    }
};

export default connect(mapStateToProps, {
    changeUnits,
    addSport,
    removeSport,
    setTotalDistance
})(SportButton)