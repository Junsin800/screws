function detectUserLocation() {
    fetch('https://api.ip.sb/geoip') // 访问新的 IP API
    .then(response => response.json()) // 解析 JSON
    .then(data => {
        console.log("检测到用户国家代码:", data.country_code); // 调试信息
        // 判断是否为中国
        if (data.country_code && (data.country_code === "CN" || data.country_code === "CHN")) {
            console.log("用户位于中国，加载百度地图");
            loadBaiduMap(); // 加载百度地图
        } else {
            console.log("用户位于非中国地区，加载谷歌地图");
            loadGoogleMap(); // 加载 Google 地图
        }
    })
    .catch((error) => {
        console.error("获取 IP 失败，默认加载 Google Maps", error);
        loadGoogleMap(); // 获取 IP 失败时默认加载 Google 地图
    });
}
function loadGoogleMap() {
    console.log("加载谷歌地图");
    document.getElementById('map-container').innerHTML = `
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d116123.4884083519!2d117.9846300126403!3d24.559533738056754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x34148955263d58a5%3A0xd92bb5cd66c96a82!2z5Y6m6Zeo5biC5p2P5p6X5bCP5bCP6J665Lid5pyJ6ZmQ5YWs5Y-4!5e0!3m2!1szh-CN!2smy!4v1740212277768!5m2!1szh-CN!2smy"
        width="100%" height="300px" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy"></iframe>
    `;
}
function loadBaiduMap() {
    console.log("加载百度地图");
    document.getElementById('map-container').innerHTML = `
        <iframe src="https://j.map.baidu.com/25/iQXi"
        width="100%" height="300px" style="border:0; border-radius: 8px;" allowfullscreen="" loading="lazy"></iframe>
    `;
}

// **使用 IntersectionObserver 监听地图位置**
function lazyLoadMap(loadMapFunction) {
    let mapContainer = document.getElementById("map-container");

    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMapFunction(); // **只有滚动到地图区域时才加载**
                observer.unobserve(mapContainer); // **加载后不再监听**
            }
        });
    });

    observer.observe(mapContainer);
}

// **页面加载时执行 IP 检测**
detectUserLocation();

  // 产品数据
  const productData = {
    car: {
      images: [
        "img/car1.jpg", "img/car2.jpg", "img/car3.jpg", "img/car4.jpg",
        "img/car5.jpg", "img/car6.jpg", "img/car7.jpg", "img/car8.jpg"
      ],
      titles: ["car1", "car2", "car3", "car4", "car5", "car6", "car7", "car8"]
    },
    bathroom: {
      images: [
        "img/bath1.jpg", "img/bath2.jpg", "img/bath3.jpg", "img/bath4.jpg",
        "img/bath5.jpg", "img/bath6.jpg", "img/bath7.jpg", "img/bath8.jpg"
      ],
      titles: ["bathroom1", "bathroom2", "bathroom3", "bathroom4", "bathroom5", "bathroom6", "bathroom7", "bathroom8"]
    },
    sports: {
      images: [
        "img/sports1.jpg", "img/sports2.jpg", "img/sports3.jpg", "img/sports4.jpg",
        "img/sports5.jpg", "img/sports6.jpg", "img/sports7.jpg", "img/sports8.jpg"
      ],
      titles: ["sports1", "sports2", "sports3", "sports4", "sports5", "sports6", "sports7", "sports8"]
    },
    furniture: {
      images: [
        "img/furniture1.jpg", "img/furniture2.jpg", "img/furniture3.jpg", "img/furniture4.jpg",
        "img/furniture5.jpg", "img/furniture6.jpg", "img/furniture7.jpg", "img/furniture8.jpg"
      ],
      titles: ["furniture1", "furniture2", "furniture3", "furniture4", "furniture5", "furniture6", "furniture7", "furniture8"],
    },
    electronics: {
      images: [
        "img/electronics1.jpg", "img/electronics2.jpg", "img/electronics3.jpg", "img/electronics4.jpg",
        "img/electronics5.jpg", "img/electronics6.jpg", "img/electronics7.jpg", "img/electronics8.jpg"
      ],
      titles: ["electronics1", "electronics2", "electronics3", "electronics4", "electronics5", "electronics6", "electronics7", "electronics8"],
    },
    machinery: {
      images: [
        "img/machinery1.jpg", "img/machinery2.jpg", "img/machinery3.jpg", "img/machinery4.jpg",
        "img/machinery5.jpg", "img/machinery6.jpg", "img/machinery7.jpg", "img/machinery8.jpg"
      ],
      titles:  ["machinery1", "machinery2", "machinery3", "machinery4", "machinery5", "machinery6", "machinery7", "machinery8"]
    }	
  };

    // 绑定 生产设备图片 预览
    document.querySelectorAll(".equipment-card img").forEach((img, index) => {
        img.addEventListener("click", function () {
            currentImageList = Array.from(document.querySelectorAll(".equipment-card img")); 
            showPreview(this.src, index);
        });
    });

    // 绑定 办公环境图片 预览
    document.querySelectorAll(".environment-card img").forEach((img, index) => {
        img.addEventListener("click", function () {
            currentImageList = Array.from(document.querySelectorAll(".environment-card img"));
            showPreview(this.src, index);
        });
    });
  document.addEventListener("DOMContentLoaded", function () {
      // 遍历 8 个产品，确保初始 `href` 设置正确
      for (let i = 0; i < 8; i++) {
          let imgElement = document.getElementById(`product${i + 1}`);
          let linkElement = document.getElementById(`link${i + 1}`);
          let titleElement = document.getElementById(`title${i + 1}`);

          if (!imgElement || !linkElement || !titleElement) continue;

          let initialImageSrc = imgElement.src; // 获取初始图片
          linkElement.href = initialImageSrc; // 让 <a> 的 href 绑定到初始图片
          linkElement.setAttribute("target", "_blank"); // 确保新窗口打开
      }
  });

function changeProducts(category) {
    const lang = localStorage.getItem("selectedLanguage") || "zh-CN";

    if (productData[category]) {
        for (let i = 0; i < 8; i++) {
            let imgElement = document.getElementById(`product${i + 1}`);
            let linkElement = document.getElementById(`link${i + 1}`);
            let titleElement = document.getElementById(`title${i + 1}`);

            if (!imgElement || !linkElement || !titleElement) continue;

            let imageSrc = productData[category].images[i];
            let titleKey = productData[category].titles[i]; // 获取产品 ID

            imgElement.src = imageSrc;
            imgElement.loading = "lazy"; // **启用懒加载**
            linkElement.href = imageSrc;
            titleElement.innerText = translations[lang][titleKey] || titleKey; // 翻译标题
        }
    }
}

  let currentImageIndex = 0;
  let currentImageList = [];
  let isAnimating = false; // 防止快速点击导致动画异常

  // 显示大图预览
  function showPreview(imgSrc, index) {
      let previewImg = document.getElementById("previewImg");
      previewImg.src = imgSrc;
      document.getElementById("imagePreview").style.display = "flex";
      currentImageIndex = index;
  }

  // 关闭预览
  function closePreview() {
      document.getElementById("imagePreview").style.display = "none";
  }

  // 监听点击事件，更新图片数据
  document.addEventListener("DOMContentLoaded", function () {
      const productImages = document.querySelectorAll(".our-product-card img");
      productImages.forEach((img, index) => {
          img.addEventListener("click", function (event) {
              event.preventDefault();
              currentImageList = Array.from(document.querySelectorAll(".our-product-card img"));
              showPreview(this.src, index);
          });
      });
  });

  // 切换图片（带滑动动画）
  function changeImage(direction) {
      if (isAnimating) return; // 防止快速切换导致错误
      isAnimating = true;

      let previewImg = document.getElementById("previewImg");
      let newIndex = (currentImageIndex + direction + currentImageList.length) % currentImageList.length;
      
      // 设置滑动方向
      previewImg.classList.add(direction === 1 ? "slide-right" : "slide-left");

      // 等待动画结束后切换图片
      setTimeout(() => {
          previewImg.src = currentImageList[newIndex].src;
          previewImg.classList.remove("slide-left", "slide-right"); // 清除动画
          currentImageIndex = newIndex;
          isAnimating = false; // 允许下次切换
      }, 500); // 这里的时间要和 CSS 里的 transition 速度一致
  }

  // 切换到上一张
  function prevImage() {
      changeImage(-1);
  }

  // 切换到下一张
  function nextImage() {
      changeImage(1);
  }

  // 监听滚动事件，控制按钮显示
window.addEventListener("scroll", function () {
    let backToTopBtn = document.getElementById("backToTop");
    if (window.scrollY > 300) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

// 平滑滚动回到顶部
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: "smooth" // 平滑滚动效果
    });
}
