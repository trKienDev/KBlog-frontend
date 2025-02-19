const applyScanningEffect = (selector: string, intervalTime: number = 5000, duration: number = 1000) => {
      setInterval(() => {
        const element = document.querySelector(selector);
        if (element) {
          element.classList.add("scan-effect");
          setTimeout(() => {
            element.classList.remove("scan-effect");
          }, duration); // Thời gian chạy hiệu ứng (khớp với CSS)
        }
      }, intervalTime); // Lặp lại hiệu ứng sau mỗi X giây
    };
    
    export default applyScanningEffect;
    