import * as signalR from "@microsoft/signalr"

let connection: signalR.HubConnection | null = null;

export async function startEmailVerificationConnection(email: string) {
      // Khởi tạo connection
      connection = new signalR.HubConnectionBuilder()
            // Server phải chạy HTTPS nếu lên production
            .withUrl(`http://localhost:3642/emailVerificationHub?email=${email}`)
            .build();

      // Lắng nghe event
      connection.on("EmailVerified", (verifiedEmail: string) => {
            console.log("Received EmailVerified event: ", verifiedEmail);
            if(verifiedEmail) {
                  window.location.href = `http://localhost:5173/email-verified?email=${verifiedEmail}`;
            }
      });

      try {
            await connection.start();
            console.log("SignalR connection started for email verification");
      } catch(error) {
            console.error("SignalR connection error: ", error);
      }
}

// Hàm stop connection
export function stopEmailVerificationConnection() {
      if(connection) {
            connection.stop();
      }
}