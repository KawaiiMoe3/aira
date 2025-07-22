import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../utils/ViteApiBaseUrl';

const ProfileContext = createContext();
export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    // Store each profile section
    const [info, setInfo] = useState(null);
    const [summary, setSummary] = useState('');
    const [languages, setLanguages] = useState([]);
    const [skills, setSkills] = useState([]);
    const [educations, setEducations] = useState([]);
    const [experiences, setExperiences] = useState([]);
    const [projects, setProjects] = useState([]);
    const [certifications, setCertifications] = useState([]);

    // Fetchers for each profile section
    const fetchInfo = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/info/`, { withCredentials: true });
        setInfo(res.data);
    };

    const fetchSummary = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/summary/`, { withCredentials: true });
        setSummary(res.data?.summary || '');
    };

    const fetchLanguages = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/languages/`, { withCredentials: true });
        setLanguages(res.data?.languages || []);
    };

    const fetchSkills = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/skills/`, { withCredentials: true });
        setSkills(res.data?.skills || []);
    };

    const fetchEducations = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/educations/`, { withCredentials: true });
        setEducations(res.data?.educations || []);
    };

    const fetchExperiences = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/experiences/`, { withCredentials: true });
        setExperiences(res.data || []);
    };

    const fetchProjects = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/projects/`, { withCredentials: true });
        setProjects(res.data || []);
    };

    const fetchCertifications = async () => {
        const res = await axios.get(`${API_BASE_URL}edit-profile/certifications/`, { withCredentials: true });
        setCertifications(res.data || []);
    };

    const fetchAllProfileData = async () => {
        setLoading(true);
        try {
            await Promise.all([
                fetchInfo(),
                fetchSummary(),
                fetchLanguages(),
                fetchSkills(),
                fetchEducations(),
                fetchExperiences(),
                fetchProjects(),
                fetchCertifications()
            ]);
        } catch (error) {
            console.error('Error loading profile data:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllProfileData();
    }, []);

    return (
        <ProfileContext.Provider
            value={{
                loading,
                info, setInfo,
                summary, setSummary,
                languages, setLanguages,
                skills, setSkills,
                educations, setEducations,
                experiences, setExperiences,
                projects, setProjects,
                certifications, setCertifications,
                refetchProfile: fetchAllProfileData,
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
};
