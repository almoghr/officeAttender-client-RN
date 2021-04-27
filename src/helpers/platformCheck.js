import {Platform} from 'react-native'

const platformCheck = (device, arg1, arg2) => {
    return Platform.OS === device ? arg1 : arg2
}

export default platformCheck