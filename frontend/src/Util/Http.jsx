import axios from "axios";

const handlePriorityFunction = async (level,userId) => {
      if (level === "all") {
        try {
          const response = await axios.get(`http://localhost:4444/notes`, {
            headers: {
              "Content-Type": "application/json",
              userId: userId,
            },
          });
          console.log(response.data.notes)
          return response.data.notes;
        } catch (error) {
          console.error(error);
        }
      } else {
        try {
          const response = await axios.get(
            `http://localhost:4444/notes?priority=${level}`,
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