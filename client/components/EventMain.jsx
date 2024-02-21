import { useSelector } from "react-redux";
import { selectAllCompanies } from "../redux/slices/companiesSlice";

const companies = useSelector(selectAllCompanies);
