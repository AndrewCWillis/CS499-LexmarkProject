import InputPerson from "../components/InputPerson";
import Header from "../components/Header.js";

const Input = () => {
    return (
        <>
            <Header />
            <div className="col-md-5 mx-auto my-auto h-100">
                <InputPerson />
            </div>
        </>
    ) 
}

export default Input;