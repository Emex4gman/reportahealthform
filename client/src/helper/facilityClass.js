import { lgas, states } from "../data/states_lgas";
import { fac_types, ownershipList } from "../data/options";
class FacilityClass {
  constructor(obj) {
    this.reg_fac_name = obj.reg_fac_name || "";
    this.fac_type =
      fac_types.filter((fac_type) => fac_type.id === obj.fac_type)[0]
        .fac_type || "";
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
    this.statename =
      states.filter((state) => state.id === obj.statename)[0].state || "";
    this.ownership =
      ownershipList.filter((ownership) => ownership.id === obj.ownership)[0]
        .value || "";
    this.facility_level = obj.facility_level || "";
    this.services = obj.services.toString().replace(RegExp(/,/gi), ", ") || "";
    this.daysOfOperations =
      obj.daysOfOperations.toString().replace(RegExp(/,/gi), ", ") || "";
    this.specilizations =
      obj.specilizations.toString().replace(RegExp(/,/gi), ", ") || "";
  }
}

export default FacilityClass;
