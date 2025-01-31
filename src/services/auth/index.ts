import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
    const cookie = await cookies();
    const userToken = cookie.get("token")?.value
    let decodedData = null;
  
    if (userToken) {
      decodedData = await jwtDecode(userToken as string);
  
      return {
        id: decodedData?.id,
        role: decodedData?.role,
        email: decodedData?.email,
      };
    }
  
    return decodedData;
  };
  