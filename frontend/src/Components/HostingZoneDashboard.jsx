import React, { useState, useEffect } from "react";
import {
  MagnifyingGlassIcon,
  UserPlusIcon,
  PencilIcon,
  TrashIcon,
  EyeIcon
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { ToastContainer } from "react-toastify";
import { listDomains, createDomain, deleteDomain, updateDomain } from "../APIs/domainAPIs";
import { useNavigate } from "react-router-dom";
import CreateDomain from "./CreateDomainpopup";
import UpdateDomain from "./UpdateDomain";

const TABLE_HEAD = ["Name", "Record Count", "Actions"];

function HostingZoneDashboard() {
  const [domainEntries, setDomainEntries] = useState([]);
  const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDomainEntries = domainEntries.filter((record) =>
    record.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      const data = await listDomains();
      setDomainEntries(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateDomain = async (recordData) => {
    try {
      if (recordToUpdate) {
        const domainId = recordToUpdate.Id;
        const hostedZoneId = domainId.split("/").pop();
        await updateDomain(hostedZoneId, recordData);
      } else {
        await createDomain(recordData);
      }
      fetchDomains();
      setIsCreateOrUpdateDNSRecordOpen(false);
      setRecordToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDomain = (record) => {
    setRecordToUpdate(record);
    setIsCreateOrUpdateDNSRecordOpen(true);
  };

  const handleDeleteDomain = async (domainId) => {
    try {
      const hostedZoneId = domainId.split("/").pop();
      await deleteDomain(hostedZoneId);
      fetchDomains();
    } catch (error) {
      console.error(error);
    }
  };

  const handleViewRecords = (hostedZoneId, domainName) => {
    const domainId = hostedZoneId.split("/").pop();
    navigate(`/records?code=${encodeURIComponent(domainId)}`, { state: { title: domainName } });
  };

  return (
    <>
      <Card className="h-full w-full shadow-lg mt-5">
        <CardHeader className="flex justify-between items-center py-4 px-6">
          <Button
            className="flex items-center gap-3"
            onClick={() => {
              setRecordToUpdate(null);
              setIsCreateOrUpdateDNSRecordOpen(true);
            }}
          >
            <UserPlusIcon className="h-5 w-5" />
            Create Domain
          </Button>
          <div className="flex w-1/2">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
          </div>
        </CardHeader>

        <CardBody className="p-0">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {head}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredDomainEntries.length > 0 ? (
                filteredDomainEntries.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.ResourceRecordSetCount}</td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      {record.ResourceRecordSetCount <= 2 ? (
                        <>
                          <IconButton
                            onClick={() => handleUpdateDomain(record)}
                            size="sm"
                            className="bg-blue-500"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </IconButton>
                          <IconButton
                            onClick={() => handleDeleteDomain(record.Id)}
                            size="sm"
                            className="bg-red-500"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </IconButton>
                        </>
                      ) : (
                        <Typography
                          variant="small"
                          color="red"
                          className="font-normal"
                        >
                          Delete all records before deleting the zone
                        </Typography>
                      )}
                      <IconButton
                        onClick={() => handleViewRecords(record.Id, record.Name)}
                        size="sm"
                        className="bg-green-500"
                      >
                        <EyeIcon className="h-5 w-5" />
                      </IconButton>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length} className="px-6 py-4 text-center">
                    <Typography variant="small" color="gray" className="font-normal">
                      No DNS records available.
                    </Typography>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      {isCreateOrUpdateDNSRecordOpen && (
        recordToUpdate ? (
          <UpdateDomain
            recordToUpdate={recordToUpdate}
            onSubmit={handleCreateOrUpdateDomain}
            onClose={() => setIsCreateOrUpdateDNSRecordOpen(false)}
          />
        ) : (
          <CreateDomain
            onSubmit={handleCreateOrUpdateDomain}
            onClose={() => setIsCreateOrUpdateDNSRecordOpen(false)}
          />
        )
      )}
    </>
  );
}

export default HostingZoneDashboard;
