// const srevices = [
//   "Medical",
//   "Surgical",
//   "Pediatrics",
//   "Obstetrics and Gynecology",
//   "Dental",
// ];

const services = [
  {
    name: "Medical",
    key: "Medical",
    label: "Medical",
  },
  {
    name: "Surgical",
    key: "Surgical",
    label: "Surgical",
  },
  {
    name: "Pediatrics",
    key: "Pediatrics",
    label: "Pediatrics",
  },
  {
    name: "Dental",
    key: "Dental",
    label: "Dental",
  },
  {
    name: "Obstetrics and Gynecology",
    key: "Obstetrics and Gynecology",
    label: "Obstetrics and Gynecology",
  },
  {
    name: "Other Services",
    key: "Other Services",
    label: "Other Services",
  },
];

export default services;

const Medical = [
  {
    name: "Cardiology",
    key: "Cardiology",
    label: "Cardiology",
  },
  {
    name: "Dermatology",
    key: "Dermatology",
    label: "Dermatology",
  },
  {
    name: "Geriatrics",
    key: "Geriatrics",
    label: "Geriatrics",
  },
  {
    name: "Pulmonology",
    key: "Pulmonology",
    label: "Pulmonology",
  },
  {
    name: "Neurology",
    key: "Neurology",
    label: "Neurology",
  },
  {
    name: "Hematology",
    key: "Hematology",
    label: "Hematology",
  },
  {
    name: "Gastroenterology",
    key: "Gastroenterology",
    label: "Gastroenterology",
  },
  {
    name: "Nephrology",
    key: "Nephrology",
    label: "Nephrology",
  },
  {
    name: "Endocrinology",
    key: "Endocrinology",
    label: "Endocrinology",
  },
  {
    name: "Family Medicine",
    key: "Family Medicine",
    label: "Family Medicine",
  },
  {
    name: "Psychiatry/ Behavioral Medicine",
    key: "Psychiatry/ Behavioral Medicine",
    label: "Psychiatry/ Behavioral Medicine",
  },
  {
    name: "Infectious Diseases",
    key: "Infectious Diseases",
    label: "Infectious Diseases",
  },
];

const Surgical = [
  {
    name: "Ophthalmology",
    key: "surgical1",
    label: "Ophthalmology",
  },
  {
    name: "General Surgery",
    key: " surgical2",
    label: "General Surgery",
  },
  {
    name: "Cardiothoracic Surgery",
    key: " surgical3",
    label: "Cardiothoracic Surgery",
  },
  {
    name: "Neuro-Surgery",
    key: "surgical4",
    label: "Neuro-Surgery",
  },
  {
    name: "Orthopedic Surgery",
    key: "surgical5",
    label: "Orthopedic Surgery",
  },
  {
    name: "Urology",
    key: "surgical6",
    label: "Urology",
  },
  {
    name: "Otorhinolaryngology(ENT)",
    key: "surgical7",
    label: "Otorhinolaryngology(ENT)",
  },
  {
    name: "Anesthesia",
    key: "surgical8",
    label: "Anesthesia",
  },
  {
    name: "Oncology / Radiotherapy",
    key: "surgical9",
    label: "Oncology / Radiotherapy",
  },
  {
    name: "Vascular Surgery",
    key: " surgical10",
    label: "Vascular Surgery",
  },
  {
    name: "Pediatric Surgery",
    key: "surgical11",
    label: "Pediatric Surgery",
  },
  {
    name: "Plastic Surgery",
    key: "surgical12",
    label: "Plastic Surgery",
  },

  {
    name: "Pathology",
    key: "surgical13",
    label: "Pathology",
  },
];
const Pediatrics = [
  {
    name: "Neonatology",
    key: "Neonatology",
    label: "Neonatology",
  },
  {
    name: "Child Psychiatry/ Behavioral Medicine",
    key: "Child Psychiatry/ Behavioral Medicine",
    label: "Child Psychiatry/ Behavioral Medicine",
  },
  {
    name: "Oncology",
    key: "Oncology",
    label: "Oncology",
  },
];
const Dental = [
  {
    name: "Oral and Maxillo- Facial Surgery",
    key: "Oral and Maxillo- Facial Surgery",
    label: "Oral and Maxillo- Facial Surgery",
  },
  {
    name: "Periodontics",
    key: "Periodontics",
    label: "Periodontics",
  },
];
const ObstetricsGynecology = [
  {
    name: "Obstetrics",
    key: "Obstetrics",
    label: "Obstetrics",
  },
  {
    name: "Gynecology",
    key: "Gynecology",
    label: "Gynecology",
  },
  {
    name: "Fertility/ Assisted Reproductive Techniques",
    key: "Fertility/ Assisted Reproductive Techniques",
    label: "Fertility/ Assisted Reproductive Techniques",
  },
];

const OtherServices = [
  {
    name: "Antenatal Care (ANC)",
    key: "Antenatal Care (ANC)",
    label: "Antenatal Care (ANC)",
  },
  {
    name: "Immunization",
    key: "Immunization",
    label: "Immunization",
  },
  {
    name: "HIV/ AIDS Services",
    key: "HIV/ AIDS Services",
    label: "HIV/ AIDS Services",
  },
  {
    name: "Non Communicable Diseases",
    key: "Non Communicable Diseases",
    label: "Non Communicable Diseases",
  },
  {
    name: "Tuberculosis",
    key: "Tuberculosis",
    label: "Tuberculosis",
  },
  {
    name: "Onsite Pharmacy",
    key: "Onsite Pharmacy",
    label: "Onsite Pharmacy",
  },
  {
    name: "Onsite Imaging",
    key: "Onsite Imaging",
    label: "Onsite Imaging",
  },
  {
    name: "Family Planning",
    key: "Family Planning",
    label: "Family Planning",
  },
  {
    name: "Mortuary Services",
    key: "Mortuary Services",
    label: "Mortuary Services",
  },
];
export const coreHospitalServices = [
  { name: "Medical", options: Medical },
  { name: "Surgical", options: Surgical },
  { name: "Pediatrics", options: Pediatrics },
  { name: "Dental", options: Dental },
  { name: "Obstetrics and Gynecology", options: ObstetricsGynecology },
  { name: "Other Services", options: OtherServices },
];

export const coreLabServices = {};

export const coreRadiologicalServices = [
  {
    name: "X-Rays",
    key: "X-Rays",
    label: "X-Rays",
  },
  {
    name: " Ultra-Sound Scan",
    key: " Ultra-Sound Scan",
    label: " Ultra-Sound Scan",
  },
  {
    name: "Computerized Tomography (CT) Scan",
    key: "Computerized Tomography (CT) Scan",
    label: "Computerized Tomography (CT) Scan",
  },
  {
    name: "Magnetic Resonance Imaging (MRI)",
    key: "Magnetic Resonance Imaging (MRI)",
    label: "Magnetic Resonance Imaging (MRI)",
  },
  {
    name: "Nuclear Imaging",
    key: "Nuclear Imaging",
    label: "Nuclear Imaging",
  },
  {
    name: "Fluoroscopy",
    key: "Fluoroscopy",
    label: "Fluoroscopy",
  },
  {
    name: "Radiotherapy",
    key: "Radiotherapy",
    label: "Radiotherapy",
  },
];
