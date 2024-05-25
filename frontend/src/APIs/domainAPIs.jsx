import axios from "axios";

const DOMAINAPIs = axios.create({
  baseURL: "https://dns-manager-khaki.vercel.app/api/domain",
});

export async function listDomains() {
  try {
    const response = await DOMAINAPIs.get("/domains");
    return response.data.hostedZones;
  } catch (error) {
    console.error('Error in receiving domains:', error.message);
  }
}

export async function createDomain(domainData) {
  try {
    const response = await DOMAINAPIs.post("/createdomain", domainData);
    console.log("Create success:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating domain:', error.message);
  }
}

export async function deleteDomain(hostedZoneId) {
  try {
    const response = await DOMAINAPIs.delete(`/deletedomain/${hostedZoneId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting domain:', error.message);
  }
}

export async function updateDomain(hostedZoneId, domainData) {
  try {
    const response = await DOMAINAPIs.put(`/updatedomain/${hostedZoneId}`, domainData);
    console.log("Update success:", response.data);
    return response.data;
  } catch (error) {
    console.error('Error updating domain:', error.message);
  }
}
