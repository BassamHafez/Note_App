import axios from "axios";

const handlePriorityFunction = async (level,userId) => {
      if (level === "all") {
        try {
          const response = await axios.get(`${process.env.REACT_APP_BACKEND_API}notes`, {
            headers: {
              "Content-Type": "application/json",
              userId: userId,
            },
          });
          return response.data.notes;
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_API}notes?priority=${level}`,
            {
              headers: {
                "Content-Type": "application/json",
                userId: userId,
              },
            }
          );
          return response.data.notes;
        } catch (error) {
          console.error(error);
        }
      }
    }

  export default handlePriorityFunction;