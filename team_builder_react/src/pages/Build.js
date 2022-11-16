import Parameters from '../components/Parameters.js';
import Header from "../components/Header.js";

const Build = () => {
    
    return(
        <>
            <Header />
            <div className="col-md-5 mx-auto my-auto h-100">
                <Parameters />
            </div>
        </>
    );
}

export default Build;