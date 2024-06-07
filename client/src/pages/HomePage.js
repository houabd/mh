

// export default HomePage;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "./../components/Layout";
import { Row, Input } from "antd";
import DoctorList from "../components/DoctorList";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedDoctor, setSearchedDoctor] = useState(null);

  // Fonction pour récupérer les données des médecins
  const getUserData = async () => {
    try {
      const res = await axios.get("/api/v1/user/getAllDoctors", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  // Fonction pour gérer la recherche
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const doctor = doctors.find((doc) => doc.firstName.toLowerCase() === term || doc.lastName.toLowerCase() === term || doc.specialization.toLowerCase() === term);
    setSearchedDoctor(doctor);
  };

  return (
    <Layout>
      <h1 className="text-center">Home Page</h1>
      <Input
        placeholder="Search for a doctor by name or specialty"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: "20px" }}
      />
      <Row>
        {searchedDoctor ? (
          <DoctorList key={searchedDoctor.id} doctor={searchedDoctor} />
        ) : (
          <p>No doctors found</p>
        )}
      </Row>
    </Layout>
  );
};

export default HomePage;

