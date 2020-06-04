import { lgas, states } from "../data/states_lgas";
import { fac_types, ownershipList, facilityLevels } from "../data/options";
class FacilityClass {
  constructor(obj) {
    this.reg_fac_name = obj.reg_fac_name || "";
    this.fac_type = resolver(fac_types, obj.fac_type) || "";
    this.CouncilRegistrationNumber = obj.CouncilRegistrationNumber;
    this.street_name = obj.street_name || "";
    this.phone_number = obj.phone_number || "";
    this.operational_hours = obj.operational_hours || "";
    this.licenseStatus = obj.licenseStatus || "";
    this.operationalStatus = obj.operationalStatus || "";
    this.registrationStatus = obj.registrationStatus || "";
    this.premises = obj.premises || "";
    this.latitude = obj.latitude || "";
    this.longitude = obj.longitude || "";
    this.lganame =
      lgas.filter(
        (lga) => lga.state_id === obj.statename && lga.lga_id === obj.lganame
      )[0].lga || "";
    this.statename = resolver(states, obj.statename) || "";
    this.ownership = resolver(ownershipList, obj.ownership) || "";
    this.facility_level = resolver(facilityLevels, obj.facility_level) || "";
    this.services = turnArrayToString(obj.services) || "";
    this.daysOfOperations = turnArrayToString(obj.daysOfOperations) || "";
    this.specilizations = turnArrayToString(obj.specilizations) || "";
  }
}

const resolver = (List, id) => {
  return List.filter((item) => item.id === id)[0].value;
};

const turnArrayToString = (arr) => {
  return arr.toString().replace(RegExp(/,/gi), ", ");
};

export default FacilityClass;
