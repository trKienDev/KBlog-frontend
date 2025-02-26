import { RegisterFormData } from "../types/RegisterFormData";
import { apiService } from "./apiService";

class UserService {
        async registerUser(data: RegisterFormData) {
                const formDataToSend = new FormData();
                if(data.name) formDataToSend.append("name", data.name);
                if(data.username) formDataToSend.append("username", data.username);
                if(data.email) formDataToSend.append("email", data.email);
                if(data.password) formDataToSend.append("password", data.password);
                if(data.profileImage) formDataToSend.append("profileImage", data.profileImage);

                return apiService.post("/user/register", formDataToSend);
        }       
}

export const userService = new UserService();