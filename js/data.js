// File: js/data.js
const booksData = [
    // --- 8 QUYỂN CŨ ---
    {
        id: 1,
        title: "Nhà Giả Kim",
        author: "Paulo Coelho",
        price: 69000,
        originalPrice: 99000,
        image: "images/books/nhagiakim.jpg",
        category: "Văn học",
        rating: 4.8,
        description: "Câu chuyện về hành trình theo đuổi ước mơ của chàng trai chăn cừu Santiago.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 2,
        title: "Đắc Nhân Tâm",
        author: "Dale Carnegie",
        price: 89000,
        originalPrice: 109000,
        image: "images/books/dacnhantam.jpg",
        category: "Kỹ năng",
        rating: 4.9,
        description: "Cuốn sách kinh điển về nghệ thuật thu phục lòng người.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 3,
        title: "Tuổi Trẻ Đáng Giá Bao Nhiêu",
        author: "Rosie Nguyễn",
        price: 69000,
        originalPrice: 89000,
        image: "images/books/tuoitre.jpg",
        category: "Kỹ năng",
        rating: 4.7,
        description: "Hành trang cho tuổi trẻ trên con đường tự học và trưởng thành.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 4,
        title: "Bố Già",
        author: "Mario Puzo",
        price: 99000,
        originalPrice: 119000,
        image: "images/books/bogia.jpg",
        category: "Văn học",
        rating: 4.8,
        description: "Tiểu thuyết nổi tiếng về thế giới mafia tại Mỹ.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 5,
        title: "Khởi Nghiệp Tinh Gọn",
        author: "Eric Ries",
        price: 109000,
        originalPrice: 129000,
        image: "images/books/khoinghiep.jpg",
        category: "Kinh tế",
        rating: 4.6,
        description: "Phương pháp khởi nghiệp hiệu quả cho startup.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 6,
        title: "Harry Potter và Hòn Đá Phù Thủy",
        author: "J.K. Rowling",
        price: 119000,
        originalPrice: 149000,
        image: "images/books/harrypotter.jpg",
        category: "Thiếu nhi",
        rating: 4.9,
        description: "Cuộc phiêu lưu kỳ diệu của cậu bé phù thủy Harry Potter.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 7,
        title: "Tiếng Anh Cơ Bản",
        author: "Nguyễn Quốc Hùng",
        price: 75000,
        originalPrice: 95000,
        image: "images/books/tienganh.jpg",
        category: "Ngoại ngữ",
        rating: 4.5,
        description: "Giáo trình học tiếng Anh từ cơ bản đến nâng cao.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 8,
        title: "Toán Lớp 10 Nâng Cao",
        author: "Bộ Giáo dục",
        price: 45000,
        originalPrice: 55000,
        image: "images/books/toan10.jpg",
        category: "Giáo khoa",
        rating: 4.3,
        description: "Sách giáo khoa toán nâng cao lớp 10.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    
    // --- 8 QUYỂN MỚI THÊM ---
    {
        id: 9,
        title: "Mắt Biếc",
        author: "Nguyễn Nhật Ánh",
        price: 110000,
        originalPrice: 130000,
        image: "images/books/matbiec.jpg",
        category: "Văn học",
        rating: 4.9,
        description: "Câu chuyện tình yêu tuổi học trò đầy tiếc nuối và hoài niệm qua ngòi bút của Nguyễn Nhật Ánh.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 10,
        title: "Dạy Con Làm Giàu",
        author: "Robert T. Kiyosaki",
        price: 85000,
        originalPrice: 115000,
        image: "images/books/dayconlamgiau.jpg",
        category: "Kinh tế",
        rating: 4.7,
        description: "Tư duy tài chính khác biệt giữa người giàu và người nghèo.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 11,
        title: "Đời Thay Đổi Khi Chúng Ta Thay Đổi",
        author: "Andrew Matthews",
        price: 59000,
        originalPrice: 79000,
        image: "images/books/doithaydoi.jpg",
        category: "Kỹ năng",
        rating: 4.6,
        description: "Những bài học nhẹ nhàng, hài hước giúp bạn nhìn cuộc sống tích cực hơn.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 12,
        title: "Dế Mèn Phiêu Lưu Ký",
        author: "Tô Hoài",
        price: 35000,
        originalPrice: 50000,
        image: "images/books/demenphieuluuky.jpg",
        category: "Thiếu nhi",
        rating: 5.0,
        description: "Tác phẩm văn học thiếu nhi kinh điển của Việt Nam về những chuyến đi của Dế Mèn.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 13,
        title: "Hoàng Tử Bé",
        author: "Antoine de Saint-Exupéry",
        price: 45000,
        originalPrice: 60000,
        image: "images/books/hoangtube.jpg",
        category: "Thiếu nhi",
        rating: 4.8,
        description: "Một câu chuyện triết lý sâu sắc được kể dưới lăng kính trẻ thơ.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 14,
        title: "Nhà Đầu Tư Thông Minh",
        author: "Benjamin Graham",
        price: 159000,
        originalPrice: 199000,
        image: "images/books/nhadaututhongminh.jpg",
        category: "Kinh tế",
        rating: 4.7,
        description: "Cuốn sách 'gối đầu giường' cho các nhà đầu tư chứng khoán giá trị.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 15,
        title: "Tâm Lý Học Tội Phạm",
        author: "Diệp Hồng Vũ",
        price: 125000,
        originalPrice: 159000,
        image: "images/books/tamlyhoctoipham.jpg",
        category: "Kỹ năng",
        rating: 4.5,
        description: "Khám phá thế giới nội tâm và hành vi của tội phạm qua góc nhìn tâm lý học.",
        isBestseller: true,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    },
    {
        id: 16,
        title: "Rừng Na Uy",
        author: "Haruki Murakami",
        price: 105000,
        originalPrice: 135000,
        image: "images/books/rungnauy.jpg",
        category: "Văn học",
        rating: 4.6,
        description: "Tiểu thuyết nổi tiếng nhất của Haruki Murakami về tình yêu và sự mất mát.",
        isBestseller: false,
        previewImages: [
            "images/books/nhagiakim.jpg", 
            "images/primages/nhagiakim/nhagiakim1.jpg",
            "images/primages/nhagiakim/nhagiakim2.jpg",
            "images/primages/nhagiakim/nhagiakim3.jpg"
        ]
    }
];