import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/admin.services';
import Pagination from '../layouts/Pagination';
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
} from "@material-tailwind/react";
import { BriefcaseIcon, PencilIcon, TrashIcon } from "@heroicons/react/24/solid";
import { PlusIcon } from "@heroicons/react/24/outline";

function Billing3() {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 6;
  
    useEffect(() => {
        getAllUsers()
        .then((res) => {
          setTotalPages(Math.ceil(res.data.length / itemsPerPage));
          setUsers(res.data.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage));
        })
        .catch((err) => console.log(err));
    }, [currentPage]);
  
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };

  return (
    <section className="w-full">
      <Card shadow={false}>
        <CardHeader
          floated={false}
          shadow={false}
          className="rounded-none flex gap-2 flex-col md:flex-row items-start justify-between"
        >
          <div className="w-full mb-2">
            <Typography className="font-bold" color="blue-gray">
              Billing Information
            </Typography>
            <Typography
              className="mt-1 font-normal text-gray-600"
              variant="small"
            >
              View and update your billing details quickly and easily.
            </Typography>
          </div>
          <div className="w-full">
            <Button
              size="sm"
              variant="outlined"
              color="gray"
              className="flex justify-center gap-3 md:max-w-fit w-full ml-auto"
            >
              <PlusIcon strokeWidth={3} className="h-4 w-4" />
              add new card
            </Button>
          </div>
        </CardHeader>
        <CardBody className="flex flex-col gap-4 p-4">
        {users.map((user, index) => (         
               <Card
               key={index} 
              shadow={false}
              className="rounded-lg border border-gray-300 p-4"
            >
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="border border-gray-200 p-2.5 rounded-lg">
                     {user.role}
                  </div>
                  <div>
                    <Typography variant="small" color="blue-gray" className="mb-1 font-bold">
                      {user.username}
                    </Typography>
                    <Typography
                      className="text-gray-600 text-xs font-normal"
                    >
                      {user.email}
                    </Typography>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    <PencilIcon className="h-4 w-4 text-gray-600" />
                    <Typography className="font-semibold text-xs text-gray-600 md:block hidden">
                      Edit
                    </Typography>
                  </Button>
                  <Button
                    size="sm"
                    variant="text"
                    color="red"
                    className="flex items-center gap-2"
                  >
                    <TrashIcon className="h-4 w-4 text-red-500" />
                    <Typography className="font-semibold text-xs text-red-500 md:block hidden">
                      delete
                    </Typography>
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </CardBody>
      </Card>
    </section>
  );
}

export default Billing3;
