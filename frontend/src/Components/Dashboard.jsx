import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon, UserPlusIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  CardBody,
  Button,
  IconButton,
} from "@material-tailwind/react";
import {
  listHostedZones,
  createDNSRecord,
  updateDNSRecord,
  deleteDNSRecord,
} from "../APIs/dnsAPIs"; // Import API functions
import CreateDNSRecord from "./createDNSpopup";
import UpdateDNSRecord from "./updateDNSpopup";
import { useNavigate, useLocation } from "react-router-dom";

const TABLE_HEAD = ["Domain Name", "Type", "Value", "Actions"];

function Dashboard() {
  const [dnsRecords, setDNSRecords] = useState([]);
  const [isCreateOrUpdateDNSRecordOpen, setIsCreateOrUpdateDNSRecordOpen] = useState(false);
  const [recordToUpdate, setRecordToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const navigate = useNavigate();
  const location = useLocation();
  const { title } = location.state || {};

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredDNSRecords = dnsRecords.filter((record) =>
    record.Name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchDNSRecords();
  }, []);

  const fetchDNSRecords = async () => {
    try {
      const data = await listHostedZones(code);
      setDNSRecords(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreateOrUpdateDNSRecord = async (recordData, ttl) => {
    try {
      if (recordToUpdate) {
        await updateDNSRecord(recordToUpdate.id, recordData, ttl, code);
      } else {
        await createDNSRecord(recordData, code);
      }
      fetchDNSRecords();
      setIsCreateOrUpdateDNSRecordOpen(false); // Close the popup after successful creation or update
      setRecordToUpdate(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateDNSRecord = (record) => {
    setRecordToUpdate(record);
    setIsCreateOrUpdateDNSRecordOpen(true);
  };

  const handleDeleteDNSRecord = async (record) => {
    try {
      await deleteDNSRecord(record.id, record, code);
      fetchDNSRecords(); // Refresh DNS records after deletion
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="h-full w-full shadow-lg mt-5">
        <CardHeader className="flex justify-between items-center py-4 px-6 bg-blue-gray-50/50">
          <Button
            className="flex items-center gap-3"
            onClick={() => setIsCreateOrUpdateDNSRecordOpen(true)}
          >
            <UserPlusIcon className="h-5 w-5" />
            Create Record
          </Button>
          <Button
            className="flex items-center gap-3"
            onClick={() => navigate("/")}
          >
            Back to Zones
          </Button>
          <div className="flex w-1/3">
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
          <div className="flex items-center justify-center text-4xl text-slate-500 p-4">
            <h1>
              <b>{title}</b>
            </h1>
          </div>
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
              {filteredDNSRecords.length > 0 ? (
                filteredDNSRecords.map((record, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{record.Name}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.Type}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{record.ResourceRecords[0].Value}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <IconButton
                          onClick={() => handleUpdateDNSRecord(record)}
                          size="sm"
                          className="bg-blue-500"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </IconButton>
                        <IconButton
                          onClick={() => handleDeleteDNSRecord(record)}
                          size="sm"
                          className="bg-red-500"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </IconButton>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={TABLE_HEAD.length + 1} className="px-6 py-4 text-center">
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

      {isCreateOrUpdateDNSRecordOpen && !recordToUpdate && (
        <CreateDNSRecord
          onSubmit={handleCreateOrUpdateDNSRecord}
          onClose={() => setIsCreateOrUpdateDNSRecordOpen(false)}
        />
      )}

      {recordToUpdate && (
        <UpdateDNSRecord
          initialDomainName={recordToUpdate.Name}
          initialRecordType={recordToUpdate.Type}
          initialRecordValue={recordToUpdate.ResourceRecords[0].Value}
          initialTTL={recordToUpdate.TTL}
          onSubmit={handleCreateOrUpdateDNSRecord}
          onClose={() => {
            setIsCreateOrUpdateDNSRecordOpen(false);
            setRecordToUpdate(null);
          }}
        />
      )}
    </>
  );
}

export default Dashboard;
