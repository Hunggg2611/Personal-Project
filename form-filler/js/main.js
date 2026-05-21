// ================================================================
// DATA: CATEGORIES
// ================================================================
const CATEGORIES = [
    { id: "all", name: "Tất cả", icon: "📂" },
    { id: "mua-ban", name: "Mua bán", icon: "🏠" },
    { id: "tang-cho", name: "Tặng cho", icon: "🎁" },
    { id: "thua-ke", name: "Thừa kế", icon: "📜" },
    { id: "the-chap", name: "Thế chấp", icon: "🏦" },
    { id: "thu-tuc-dat", name: "Thủ tục đất", icon: "📐" },
    { id: "cho-thue", name: "Cho thuê", icon: "🏘️" },
];

// ================================================================
// DATA: PROCEDURES
// ================================================================
const PROCEDURES = {
    mua_ban_bds: {
        id: "mua_ban_bds",
        name: "Mua bán / Chuyển nhượng bất động sản",
        shortName: "Mua bán BĐS",
        category: "mua-ban",
        icon: "🏠",
        agency: "Văn phòng đăng ký đất đai",
        level: "Quận/Huyện",
        estimatedDays: "15–30 ngày làm việc",
        legalBasis: [
            "Luật Kinh doanh Bất động sản 2023 (Điều 3, 39, 40)",
            "Luật Đất đai 2024 (Điều 27)",
            "Luật Công chứng 2024 (Điều 42, 43)",
            "Nghị định 101/2024/NĐ-CP (Điều 29)",
            "Nghị định 151/2025/NĐ-CP (thay thế biểu mẫu đăng ký đất đai — hiệu lực 01/7/2025)",
            "Nghị định 175/2025/NĐ-CP (sửa đổi NĐ 10/2022 về lệ phí trước bạ)",
            "Luật Thuế TNCN 2025 (109/2025/QH15) — hiệu lực 01/7/2026",
            "Thông tư 80/2021/TT-BTC",
        ],

        intake: [
            {
                id: "propertyType",
                question: "Loại bất động sản?",
                type: "radio",
                options: [
                    { value: "dat_nen", label: "Đất nền (chỉ đất)" },
                    { value: "nha_dat", label: "Nhà đất (đất + nhà ở)" },
                    { value: "can_ho", label: "Căn hộ chung cư" },
                ],
            },
            {
                id: "sellerMarital",
                question: "Tình trạng hôn nhân bên bán?",
                type: "radio",
                options: [
                    { value: "single", label: "Độc thân / Ly hôn / Góa" },
                    { value: "married", label: "Đã kết hôn" },
                ],
            },
            {
                id: "assetType",
                question: "Bất động sản thuộc tài sản chung hay riêng của bên bán?",
                type: "radio",
                options: [
                    { value: "shared", label: "Tài sản chung vợ chồng" },
                    { value: "separate", label: "Tài sản riêng (có giấy xác nhận)" },
                ],
                showIf: (ctx) => ctx.sellerMarital === "married",
            },
            {
                id: "buyerType",
                question: "Bên mua là cá nhân hay tổ chức?",
                type: "radio",
                options: [
                    { value: "ca_nhan", label: "Cá nhân" },
                    { value: "to_chuc", label: "Tổ chức / Doanh nghiệp" },
                ],
            },
            {
                id: "hasProxy",
                question: "Có ủy quyền người khác thay mặt ký không?",
                type: "radio",
                options: [
                    { value: "no", label: "Không — tự ký" },
                    { value: "yes", label: "Có — ủy quyền" },
                ],
            },
            {
                id: "sameProvince",
                question: "Bên mua có hộ khẩu cùng tỉnh/TP với nơi có bất động sản?",
                type: "radio",
                options: [
                    { value: "yes", label: "Cùng tỉnh/thành phố" },
                    { value: "no", label: "Khác tỉnh/thành phố" },
                ],
            },
        ],

        baseFees: [
            { id: "lptb", name: "Lệ phí trước bạ", amount: "0.5% giá trị đất (theo bảng giá UBND)", active: true },
            { id: "thue_tncn", name: "Thuế TNCN (bên bán)", amount: "2% giá chuyển nhượng", active: true },
            { id: "phi_tham_dinh", name: "Phí thẩm định hồ sơ", amount: "Theo quy định địa phương (0.15%)", active: true },
            { id: "phi_cong_chung", name: "Phí công chứng", amount: "Theo biểu phí công chứng (0.1% – 0.01%)", active: true },
        ],

        baseEligibility: [
            { id: "has_gcn", question: "Bất động sản đã có Giấy chứng nhận (sổ đỏ/sổ hồng)?", failMessage: "BĐS chưa có GCN không đủ điều kiện chuyển nhượng. Cần làm thủ tục cấp GCN trước.", active: true },
            { id: "no_dispute", question: "BĐS không có tranh chấp?", failMessage: "Đất đang tranh chấp không được phép chuyển nhượng (Điều 45 Luật Đất đai 2024).", active: true },
            { id: "no_seizure", question: "BĐS không bị kê biên thi hành án?", failMessage: "BĐS bị kê biên không được chuyển nhượng.", active: true },
            { id: "within_term", question: "Đất còn trong thời hạn sử dụng?", failMessage: "Cần gia hạn thời hạn sử dụng đất trước.", active: true },
            { id: "no_plan", question: "BĐS không thuộc diện quy hoạch đã có thông báo thu hồi?", failMessage: "Đất thuộc diện thu hồi có thể bị hạn chế chuyển nhượng.", active: true },
        ],

        baseRequirements: [
            { id: "gcn", name: "Giấy chứng nhận QSDĐ / Quyền sở hữu nhà (bản gốc)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_ben_ban", name: "CMND/CCCD bên bán (bản sao + mang bản gốc đối chiếu)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_vo_chong_ban", name: "CMND/CCCD vợ/chồng bên bán", required: true, active: false, forContext: "shared_asset", group: "cong_chung" },
            { id: "cmnd_ben_mua", name: "CMND/CCCD bên mua (bản sao + mang bản gốc đối chiếu)", required: true, active: true, group: "cong_chung" },
            { id: "hon_nhan_ban", name: "Giấy xác nhận tình trạng hôn nhân bên bán", required: true, active: true, group: "cong_chung" },
            { id: "hon_nhan_mua", name: "Giấy xác nhận tình trạng hôn nhân bên mua", required: true, active: true, group: "cong_chung" },
            { id: "dang_ky_ket_hon", name: "Giấy đăng ký kết hôn bên bán (bản sao)", required: true, active: false, forContext: "married_seller", group: "cong_chung" },
            { id: "hop_dong_cn", name: "Hợp đồng chuyển nhượng QSDĐ (có công chứng)", required: true, active: true, group: "cong_chung" },
            { id: "uy_quyen", name: "Hợp đồng ủy quyền (có công chứng)", required: true, active: false, forContext: "proxy", group: "cong_chung" },
            { id: "to_khai_tncn", name: "Tờ khai thuế TNCN (Mẫu 03/BĐS-TNCN)", required: true, active: true, group: "thue" },
            { id: "ban_chup_gcn", name: "Bản chụp Giấy chứng nhận QSDĐ", required: true, active: true, group: "thue" },
            { id: "hop_dong_bn_thue", name: "Hợp đồng chuyển nhượng (bản sao cho cơ quan thuế)", required: true, active: true, group: "thue" },
            { id: "to_khai_lptb", name: "Tờ khai lệ phí trước bạ (Mẫu 01/LPTB)", required: true, active: true, group: "thue" },
            { id: "giay_mien_thue", name: "Giấy tờ chứng minh miễn thuế (nếu có)", required: false, active: true, group: "thue" },
            { id: "don_dang_ky", name: "Đơn đăng ký biến động (Mẫu số 18)", required: true, active: true, group: "bien_dong" },
            { id: "hop_dong_cong_chung", name: "Hợp đồng chuyển nhượng có công chứng (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "gcn_goc_bd", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "bien_lai_thue", name: "Biên lai nộp thuế, lệ phí trước bạ", required: true, active: true, group: "bien_dong", note: "Nộp sau khi có thông báo thuế" },
            { id: "vb_dai_dien", name: "Văn bản đại diện (nếu ủy quyền người đại diện nộp)", required: false, active: false, forContext: "proxy", group: "bien_dong" },
            { id: "ho_khau_ben_ban", name: "Sổ hộ khẩu / Xác nhận cư trú bên bán", required: true, active: true, group: "cong_chung" },
            { id: "xac_nhan_cu_tru", name: "Xác nhận cư trú / Sổ hộ khẩu bên mua", required: false, active: false, forContext: "diff_province", group: "bien_dong" },
            { id: "gpkd", name: "Giấy phép kinh doanh / Giấy đăng ký doanh nghiệp", required: true, active: false, forContext: "to_chuc", group: "cong_chung" },
        ],

        baseSteps: [
            { order: 1, id: "cong_chung", title: "Công chứng hợp đồng chuyển nhượng", instruction: "Bên bán và bên mua đến Văn phòng công chứng cùng ký Hợp đồng chuyển nhượng QSDĐ. Công chứng viên xác nhận năng lực hành vi và tính hợp pháp của giao dịch.", location: "Văn phòng Công chứng (nơi có BĐS)", estimatedTime: "1–2 ngày", tip: "Phải chọn Văn phòng công chứng tại tỉnh/TP nơi có bất động sản (Điều 42 Luật Công chứng 2024).", active: true },
            { order: 2, id: "ke_khai_thue", title: "Kê khai thuế TNCN và lệ phí trước bạ", instruction: "Nộp tờ khai thuế TNCN (Mẫu 03/BĐS-TNCN) và tờ khai lệ phí trước bạ (Mẫu 01/LPTB) tại Chi cục Thuế quận/huyện nơi có BĐS.", location: "Chi cục Thuế quận/huyện nơi có BĐS", estimatedTime: "1–3 ngày", tip: "Có thể nộp hồ sơ khai thuế cùng lúc với hồ sơ đăng ký biến động (Nghị định 101/2024/NĐ-CP). Kê khai trực tuyến: thuedientu.gdt.gov.vn.", active: true },
            { order: 3, id: "nop_thue", title: "Nộp tiền thuế và lệ phí", instruction: "Sau khi nhận thông báo nộp thuế từ cơ quan thuế, nộp tiền tại ngân hàng hoặc Kho bạc Nhà nước.", location: "Ngân hàng / Kho bạc Nhà nước", estimatedTime: "1 ngày", tip: "Giữ biên lai nộp thuế (bản gốc) để nộp kèm hồ sơ đăng ký biến động. Ngay cả khi được miễn thuế, vẫn phải kê khai.", active: true },
            { order: 4, id: "nop_ho_so", title: "Nộp hồ sơ đăng ký biến động", instruction: "Nộp đầy đủ hồ sơ (Đơn đăng ký biến động Mẫu số 18 + HĐ công chứng + GCN gốc + biên lai thuế) tại Văn phòng đăng ký đất đai hoặc Bộ phận một cửa.", location: "VPĐKĐĐ / Bộ phận một cửa quận/huyện", estimatedTime: "10–15 ngày xử lý", tip: "Kiểm tra kỹ hồ sơ trước khi nộp. Lưu giấy hẹn.", active: true },
            { order: 5, id: "nhan_ket_qua", title: "Nhận Giấy chứng nhận mới", instruction: "Nhận GCN mới (đã sang tên bên mua) theo giấy hẹn tại nơi nộp hồ sơ.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "Theo giấy hẹn", tip: "Mang giấy hẹn + CMND/CCCD gốc. Kiểm tra thông tin trên GCN mới ngay khi nhận.", active: true },
        ],

        baseForms: ["mau18", "mau03bds_tncn", "mau01lptb", "hop_dong_dat_coc", "giay_uy_quyen"],

        rules: [
            {
                id: "married_seller",
                condition: (ctx) => ctx.sellerMarital === "married",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "dang_ky_ket_hon").active = true;
                },
            },
            {
                id: "shared_asset",
                condition: (ctx) => ctx.sellerMarital === "married" && ctx.assetType === "shared",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "cmnd_vo_chong_ban").active = true;
                    wf.notes.push("BĐS là tài sản chung vợ chồng → vợ/chồng bên bán PHẢI cùng ký hợp đồng chuyển nhượng tại văn phòng công chứng.");
                    wf.eligibility.push({
                        id: "spouse_agree",
                        question: "Vợ/chồng bên bán đồng ý bán?",
                        failMessage: "Cần có sự đồng ý của cả hai vợ chồng đối với tài sản chung (Điều 35 Luật Hôn nhân gia đình 2014).",
                        active: true,
                    });
                },
            },
            {
                id: "proxy",
                condition: (ctx) => ctx.hasProxy === "yes",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "uy_quyen").active = true;
                    wf.requirements.find(r => r.id === "vb_dai_dien").active = true;
                    wf.notes.push("Trường hợp ủy quyền: Hợp đồng ủy quyền phải được công chứng. Người được ủy quyền mang theo CMND/CCCD gốc của mình + bản sao CMND bên ủy quyền.");
                },
            },
            {
                id: "diff_province",
                condition: (ctx) => ctx.sameProvince === "no",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "xac_nhan_cu_tru").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_cu_tru").required = true;
                    wf.notes.push("Bên mua khác tỉnh — cần bổ sung xác nhận cư trú. Thời gian xử lý có thể lâu hơn.");
                },
            },
            {
                id: "buyer_org",
                condition: (ctx) => ctx.buyerType === "to_chuc",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "gpkd").active = true;
                    wf.requirements.find(r => r.id === "hon_nhan_mua").active = false;
                    wf.notes.push("Bên mua là tổ chức: cần GPKD/ĐKDN, con dấu pháp nhân, và người đại diện pháp luật ký hợp đồng.");
                },
            },
            {
                id: "can_ho",
                condition: (ctx) => ctx.propertyType === "can_ho",
                apply: (wf) => {
                    wf.notes.push("Căn hộ chung cư: kiểm tra thêm phí bảo trì (2%), quy chế quản lý tòa nhà, và xác nhận chủ đầu tư đã bàn giao sổ hồng.");
                },
            },
        ],
    },

    tang_cho_bds: {
        id: "tang_cho_bds",
        name: "Tặng cho bất động sản",
        shortName: "Tặng cho BĐS",
        category: "tang-cho",
        icon: "🎁",
        agency: "Văn phòng đăng ký đất đai",
        level: "Quận/Huyện",
        estimatedDays: "15–30 ngày làm việc",
        legalBasis: [
            "Luật Đất đai 2024 (Điều 27)",
            "Luật Công chứng 2024 (Điều 42, 43)",
            "Nghị định 101/2024/NĐ-CP (Điều 29)",
            "Nghị định 151/2025/NĐ-CP (thay thế biểu mẫu đăng ký đất đai — hiệu lực 01/7/2025)",
            "Luật Thuế TNCN 2025 (109/2025/QH15) — hiệu lực 01/7/2026",
            "Nghị định 175/2025/NĐ-CP (sửa đổi NĐ 10/2022 về lệ phí trước bạ)",
            "Thông tư 80/2021/TT-BTC",
        ],

        intake: [
            {
                id: "relationship",
                question: "Quan hệ giữa bên tặng cho và bên nhận?",
                type: "radio",
                options: [
                    { value: "spouse", label: "Vợ — chồng" },
                    { value: "parent_child", label: "Cha mẹ đẻ — con đẻ / Cha mẹ nuôi — con nuôi" },
                    { value: "in_law", label: "Cha mẹ chồng/vợ — con dâu/rể" },
                    { value: "grandparent", label: "Ông bà — cháu (nội/ngoại)" },
                    { value: "sibling", label: "Anh chị em ruột" },
                    { value: "none", label: "Không có quan hệ huyết thống / hôn nhân" },
                ],
            },
            {
                id: "sellerMarital",
                question: "Tình trạng hôn nhân bên tặng cho?",
                type: "radio",
                options: [
                    { value: "single", label: "Độc thân / Ly hôn / Góa" },
                    { value: "married", label: "Đã kết hôn" },
                ],
            },
            {
                id: "assetType",
                question: "BĐS thuộc tài sản chung hay riêng?",
                type: "radio",
                options: [
                    { value: "shared", label: "Tài sản chung vợ chồng" },
                    { value: "separate", label: "Tài sản riêng" },
                ],
                showIf: (ctx) => ctx.sellerMarital === "married",
            },
            {
                id: "sameProvince",
                question: "Bên nhận có hộ khẩu cùng tỉnh/TP với nơi có BĐS?",
                type: "radio",
                options: [
                    { value: "yes", label: "Cùng tỉnh/thành phố" },
                    { value: "no", label: "Khác tỉnh/thành phố" },
                ],
            },
        ],

        baseFees: [
            { id: "lptb", name: "Lệ phí trước bạ", amount: "0.5% giá trị đất", active: true },
            { id: "thue_tncn", name: "Thuế TNCN (bên nhận tặng cho)", amount: "2% giá trị BĐS", active: true },
            { id: "phi_tham_dinh", name: "Phí thẩm định hồ sơ", amount: "Theo quy định địa phương", active: true },
            { id: "phi_cong_chung", name: "Phí công chứng", amount: "Theo biểu phí công chứng", active: true },
        ],

        baseEligibility: [
            { id: "has_gcn", question: "BĐS đã có Giấy chứng nhận (sổ đỏ/sổ hồng)?", failMessage: "BĐS chưa có GCN không đủ điều kiện tặng cho.", active: true },
            { id: "no_dispute", question: "BĐS không có tranh chấp?", failMessage: "Đất đang tranh chấp không được tặng cho.", active: true },
            { id: "no_seizure", question: "BĐS không bị kê biên thi hành án?", failMessage: "BĐS bị kê biên không được tặng cho.", active: true },
            { id: "within_term", question: "Đất còn trong thời hạn sử dụng?", failMessage: "Cần gia hạn trước.", active: true },
        ],

        baseRequirements: [
            { id: "gcn", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_ben_tang", name: "CMND/CCCD bên tặng cho (bản sao + gốc đối chiếu)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_vo_chong", name: "CMND/CCCD vợ/chồng bên tặng cho", required: true, active: false, forContext: "shared_asset", group: "cong_chung" },
            { id: "cmnd_ben_nhan", name: "CMND/CCCD bên nhận tặng cho (bản sao + gốc đối chiếu)", required: true, active: true, group: "cong_chung" },
            { id: "hon_nhan_tang", name: "Giấy xác nhận tình trạng hôn nhân bên tặng", required: true, active: true, group: "cong_chung" },
            { id: "hop_dong_tc", name: "Hợp đồng tặng cho QSDĐ (có công chứng)", required: true, active: true, group: "cong_chung" },
            { id: "ho_khau_tang_nhan", name: "Sổ hộ khẩu / Xác nhận cư trú (bên tặng và bên nhận)", required: true, active: true, group: "cong_chung" },
            { id: "xac_nhan_quan_he", name: "Giấy tờ chứng minh quan hệ gia đình", required: true, active: false, forContext: "family_relation", group: "cong_chung" },
            { id: "to_khai_tncn", name: "Tờ khai thuế TNCN (Mẫu 03/BĐS-TNCN)", required: true, active: true, group: "thue", note: "Vẫn phải kê khai dù được miễn" },
            { id: "to_khai_lptb", name: "Tờ khai lệ phí trước bạ (Mẫu 01/LPTB)", required: true, active: true, group: "thue" },
            { id: "giay_mien_thue", name: "Giấy tờ chứng minh miễn thuế (sổ hộ khẩu, khai sinh...)", required: false, active: false, forContext: "family_exempt", group: "thue" },
            { id: "don_dang_ky", name: "Đơn đăng ký biến động (Mẫu số 18)", required: true, active: true, group: "bien_dong" },
            { id: "hop_dong_cong_chung", name: "Hợp đồng tặng cho đã công chứng (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "gcn_goc_bd", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "bien_lai_thue", name: "Biên lai nộp thuế/lệ phí (hoặc xác nhận miễn)", required: true, active: true, group: "bien_dong" },
            { id: "xac_nhan_cu_tru", name: "Xác nhận cư trú bên nhận", required: false, active: false, forContext: "diff_province", group: "bien_dong" },
        ],

        baseSteps: [
            { order: 1, id: "cong_chung", title: "Công chứng hợp đồng tặng cho", instruction: "Bên tặng cho và bên nhận đến Văn phòng công chứng cùng ký Hợp đồng tặng cho QSDĐ.", location: "Văn phòng Công chứng (nơi có BĐS)", estimatedTime: "1–2 ngày", tip: "Nếu BĐS là tài sản chung, vợ/chồng bên tặng phải cùng ký.", active: true },
            { order: 2, id: "ke_khai_thue", title: "Kê khai thuế TNCN và lệ phí trước bạ", instruction: "Nộp tờ khai thuế TNCN và lệ phí trước bạ tại Chi cục Thuế.", location: "Chi cục Thuế quận/huyện nơi có BĐS", estimatedTime: "1–3 ngày", tip: "Ngay cả khi được miễn thuế, bên nhận vẫn PHẢI kê khai để cơ quan thuế xác nhận.", active: true },
            { order: 3, id: "nop_thue", title: "Nộp thuế/lệ phí (nếu có)", instruction: "Nộp tiền thuế theo thông báo. Nếu được miễn, nhận văn bản xác nhận miễn.", location: "Ngân hàng / Kho bạc", estimatedTime: "1 ngày", tip: "Giữ biên lai hoặc văn bản miễn thuế.", active: true },
            { order: 4, id: "nop_ho_so", title: "Nộp hồ sơ đăng ký biến động", instruction: "Nộp hồ sơ tại Văn phòng đăng ký đất đai.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "10–15 ngày", tip: "Kiểm tra kỹ hồ sơ trước khi nộp.", active: true },
            { order: 5, id: "nhan_ket_qua", title: "Nhận GCN mới", instruction: "Nhận Giấy chứng nhận mới (tên bên nhận tặng cho).", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "Theo giấy hẹn", tip: "Mang giấy hẹn + CMND/CCCD gốc.", active: true },
        ],

        baseForms: ["mau18", "mau03bds_tncn", "mau01lptb", "giay_uy_quyen"],

        rules: [
            {
                id: "mien_thue_vo_chong",
                condition: (ctx) => ctx.relationship === "spouse",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "thue_tncn").active = false;
                    wf.fees.find(f => f.id === "lptb").active = false;
                    wf.notes.push("✅ MIỄN thuế TNCN và lệ phí trước bạ — tặng cho giữa vợ chồng (Khoản 4, Điều 4 Luật Thuế TNCN; Nghị định 10/2022/NĐ-CP).");
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").name = "Giấy đăng ký kết hôn (bản sao)";
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_cha_me_con",
                condition: (ctx) => ctx.relationship === "parent_child",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "thue_tncn").active = false;
                    wf.notes.push("✅ MIỄN thuế TNCN — tặng cho giữa cha mẹ và con (Khoản 4, Điều 4 Luật Thuế TNCN).");
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").name = "Giấy khai sinh / Sổ hộ khẩu chứng minh quan hệ cha mẹ - con";
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_ong_ba_chau",
                condition: (ctx) => ctx.relationship === "grandparent",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "thue_tncn").active = false;
                    wf.notes.push("✅ MIỄN thuế TNCN — tặng cho giữa ông bà và cháu (Khoản 4, Điều 4 Luật Thuế TNCN).");
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").name = "Giấy khai sinh / Sổ hộ khẩu chứng minh quan hệ ông bà - cháu";
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_con_dau_re",
                condition: (ctx) => ctx.relationship === "in_law",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "lptb").active = false;
                    wf.notes.push("✅ MIỄN lệ phí trước bạ — tặng cho giữa cha mẹ chồng/vợ và con dâu/rể (NĐ 175/2025/NĐ-CP).");
                    wf.notes.push("⏳ Thuế TNCN: hiện vẫn phải nộp 2%. Từ 01/7/2026, sẽ được MIỄN theo Luật Thuế TNCN 2025.");
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").name = "Giấy đăng ký kết hôn + giấy khai sinh chứng minh quan hệ";
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_anh_chi_em",
                condition: (ctx) => ctx.relationship === "sibling",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "lptb").active = false;
                    wf.notes.push("✅ MIỄN lệ phí trước bạ — tặng cho giữa anh chị em ruột (NĐ 175/2025/NĐ-CP, hiệu lực 01/7/2025).");
                    wf.notes.push("⏳ Thuế TNCN: hiện vẫn phải nộp 2%. Từ 01/7/2026, sẽ được MIỄN theo Luật Thuế TNCN 2025 (109/2025/QH15).");
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_quan_he").name = "Giấy khai sinh chứng minh quan hệ anh chị em ruột";
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "no_relation_no_exempt",
                condition: (ctx) => ctx.relationship === "none",
                apply: (wf) => {
                    wf.warnings.push("⚠️ Không có quan hệ gia đình — phải nộp đầy đủ thuế TNCN (2%) và lệ phí trước bạ (0.5%).");
                },
            },
            {
                id: "shared_asset_tc",
                condition: (ctx) => ctx.sellerMarital === "married" && ctx.assetType === "shared",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "cmnd_vo_chong").active = true;
                    wf.notes.push("BĐS là tài sản chung → vợ/chồng bên tặng cho PHẢI cùng ký hợp đồng tặng cho.");
                    wf.eligibility.push({
                        id: "spouse_agree",
                        question: "Vợ/chồng bên tặng cho đồng ý tặng?",
                        failMessage: "Cần sự đồng ý của cả hai vợ chồng.",
                        active: true,
                    });
                },
            },
            {
                id: "diff_province_tc",
                condition: (ctx) => ctx.sameProvince === "no",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "xac_nhan_cu_tru").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_cu_tru").required = true;
                },
            },
        ],
    },

    thua_ke_bds: {
        id: "thua_ke_bds",
        name: "Thừa kế bất động sản",
        shortName: "Thừa kế BĐS",
        category: "thua-ke",
        icon: "📜",
        agency: "Văn phòng đăng ký đất đai",
        level: "Quận/Huyện",
        estimatedDays: "20–45 ngày làm việc",
        legalBasis: [
            "Bộ luật Dân sự 2015 (Phần thừa kế)",
            "Luật Đất đai 2024 (Điều 27)",
            "Luật Công chứng 2024 (Điều 42, 43, 57, 58)",
            "Nghị định 101/2024/NĐ-CP",
            "Nghị định 151/2025/NĐ-CP (thay thế biểu mẫu đăng ký đất đai — hiệu lực 01/7/2025)",
            "Luật Thuế TNCN 2025 (109/2025/QH15) — hiệu lực 01/7/2026",
            "Nghị định 175/2025/NĐ-CP (sửa đổi NĐ 10/2022 về lệ phí trước bạ)",
            "Thông tư 80/2021/TT-BTC",
        ],

        intake: [
            {
                id: "inheritanceType",
                question: "Thừa kế theo di chúc hay theo pháp luật?",
                type: "radio",
                options: [
                    { value: "will", label: "Theo di chúc" },
                    { value: "law", label: "Theo pháp luật (không có di chúc)" },
                ],
            },
            {
                id: "multipleHeirs",
                question: "Có nhiều đồng thừa kế không?",
                type: "radio",
                options: [
                    { value: "yes", label: "Có — cần phân chia di sản" },
                    { value: "no", label: "Không — một người thừa kế duy nhất" },
                ],
            },
            {
                id: "relationship",
                question: "Quan hệ người nhận thừa kế với người mất?",
                type: "radio",
                options: [
                    { value: "spouse", label: "Vợ / Chồng" },
                    { value: "parent_child", label: "Con (đẻ / nuôi hợp pháp)" },
                    { value: "in_law", label: "Con dâu / Con rể" },
                    { value: "grandparent", label: "Cháu (nội/ngoại)" },
                    { value: "sibling", label: "Anh chị em ruột" },
                    { value: "other", label: "Quan hệ khác" },
                ],
            },
            {
                id: "sameProvince",
                question: "Người nhận thừa kế có hộ khẩu cùng tỉnh/TP nơi có BĐS?",
                type: "radio",
                options: [
                    { value: "yes", label: "Cùng tỉnh/thành phố" },
                    { value: "no", label: "Khác tỉnh/thành phố" },
                ],
            },
        ],

        baseFees: [
            { id: "lptb", name: "Lệ phí trước bạ", amount: "0.5% giá trị đất", active: true },
            { id: "thue_tncn", name: "Thuế TNCN", amount: "2% giá trị BĐS", active: true },
            { id: "phi_tham_dinh", name: "Phí thẩm định hồ sơ", amount: "Theo quy định địa phương", active: true },
            { id: "phi_cong_chung", name: "Phí công chứng", amount: "Theo biểu phí công chứng", active: true },
        ],

        baseEligibility: [
            { id: "has_gcn", question: "BĐS đã có Giấy chứng nhận (sổ đỏ/sổ hồng)?", failMessage: "BĐS chưa có GCN. Cần làm thủ tục cấp GCN trước khi đăng ký thừa kế.", active: true },
            { id: "has_death_cert", question: "Đã có giấy chứng tử của người để lại di sản?", failMessage: "Phải có giấy chứng tử mới thực hiện được thủ tục thừa kế.", active: true },
            { id: "no_dispute", question: "Không có tranh chấp về di sản thừa kế?", failMessage: "Nếu có tranh chấp, cần giải quyết tại Tòa án trước.", active: true },
            { id: "no_seizure", question: "BĐS không bị kê biên?", failMessage: "BĐS bị kê biên không thể đăng ký thừa kế.", active: true },
        ],

        baseRequirements: [
            { id: "gcn", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "cong_chung" },
            { id: "giay_chet", name: "Giấy chứng tử của người để lại di sản (bản sao)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_nguoi_nhan", name: "CMND/CCCD người nhận thừa kế", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_dong_thua_ke", name: "CMND/CCCD của TẤT CẢ đồng thừa kế", required: true, active: false, forContext: "multi_heirs", group: "cong_chung" },
            { id: "di_chuc", name: "Di chúc (bản gốc hoặc bản sao công chứng)", required: true, active: false, forContext: "will", group: "cong_chung" },
            { id: "vb_phan_chia", name: "Văn bản phân chia di sản thừa kế (có công chứng)", required: true, active: false, forContext: "multi_heirs", group: "cong_chung" },
            { id: "vb_tu_choi", name: "Văn bản từ chối nhận di sản (nếu có đồng thừa kế từ chối)", required: false, active: false, forContext: "multi_heirs_refuse", group: "cong_chung", note: "Phải có công chứng hoặc chứng thực" },
            { id: "vb_khai_nhan", name: "Văn bản khai nhận di sản thừa kế (có công chứng)", required: true, active: false, forContext: "single_heir", group: "cong_chung" },
            { id: "so_ho_khau", name: "Sổ hộ khẩu / Giấy khai sinh chứng minh quan hệ", required: true, active: true, group: "cong_chung" },
            { id: "phieu_yc_cong_chung", name: "Phiếu yêu cầu công chứng", required: true, active: true, group: "cong_chung", note: "Nộp tại Văn phòng công chứng khi lập văn bản thừa kế" },
            { id: "to_khai_tncn", name: "Tờ khai thuế TNCN (Mẫu 03/BĐS-TNCN)", required: true, active: true, group: "thue", note: "Vẫn phải kê khai dù được miễn" },
            { id: "to_khai_lptb", name: "Tờ khai lệ phí trước bạ (Mẫu 01/LPTB)", required: true, active: true, group: "thue" },
            { id: "giay_mien_thue", name: "Giấy tờ chứng minh quan hệ để miễn thuế", required: false, active: false, forContext: "family_exempt", group: "thue" },
            { id: "don_dang_ky", name: "Đơn đăng ký biến động (Mẫu số 18)", required: true, active: true, group: "bien_dong" },
            { id: "vb_thua_ke_goc", name: "Văn bản thừa kế đã công chứng (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "gcn_goc_bd", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "bien_lai_thue", name: "Biên lai nộp thuế/lệ phí (hoặc xác nhận miễn)", required: true, active: true, group: "bien_dong" },
            { id: "xac_nhan_cu_tru", name: "Xác nhận cư trú người nhận thừa kế", required: false, active: false, forContext: "diff_province", group: "bien_dong" },
        ],

        baseSteps: [
            { order: 1, id: "cong_chung", title: "Công chứng văn bản thừa kế", instruction: "Đến Văn phòng công chứng để lập Văn bản khai nhận / phân chia di sản thừa kế. Phải niêm yết 15 ngày tại UBND cấp xã nơi có BĐS.", location: "Văn phòng Công chứng (nơi có BĐS hoặc nơi mở thừa kế)", estimatedTime: "15–30 ngày (gồm niêm yết)", tip: "Theo Luật Công chứng 2024 (Điều 57, 58): văn bản thừa kế phải được niêm yết tại UBND xã 15 ngày. Nếu có di chúc, thời gian nhanh hơn.", active: true },
            { order: 2, id: "ke_khai_thue", title: "Kê khai thuế TNCN và lệ phí trước bạ", instruction: "Nộp tờ khai thuế TNCN và lệ phí trước bạ tại Chi cục Thuế.", location: "Chi cục Thuế quận/huyện nơi có BĐS", estimatedTime: "1–3 ngày", tip: "Dù được miễn thuế do quan hệ gia đình, vẫn PHẢI kê khai. Cơ quan thuế xác nhận miễn.", active: true },
            { order: 3, id: "nop_thue", title: "Nộp thuế/lệ phí (nếu có)", instruction: "Nộp tiền theo thông báo hoặc nhận xác nhận miễn thuế.", location: "Ngân hàng / Kho bạc", estimatedTime: "1 ngày", tip: "Giữ biên lai hoặc văn bản xác nhận miễn.", active: true },
            { order: 4, id: "nop_ho_so", title: "Nộp hồ sơ đăng ký biến động", instruction: "Nộp hồ sơ đầy đủ tại Văn phòng đăng ký đất đai.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "10–15 ngày", tip: "Kiểm tra kỹ hồ sơ.", active: true },
            { order: 5, id: "nhan_ket_qua", title: "Nhận GCN mới", instruction: "Nhận GCN mới mang tên người nhận thừa kế.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "Theo giấy hẹn", tip: "Mang giấy hẹn + CMND/CCCD gốc.", active: true },
        ],

        baseForms: ["mau18", "mau03bds_tncn", "mau01lptb", "giay_uy_quyen"],

        rules: [
            {
                id: "thua_ke_di_chuc",
                condition: (ctx) => ctx.inheritanceType === "will",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "di_chuc").active = true;
                    wf.steps.find(s => s.id === "cong_chung").tip = "Có di chúc hợp lệ: không cần niêm yết 15 ngày. Thời gian nhanh hơn so với thừa kế theo pháp luật.";
                },
            },
            {
                id: "thua_ke_nhieu_nguoi",
                condition: (ctx) => ctx.multipleHeirs === "yes",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "vb_phan_chia").active = true;
                    wf.requirements.find(r => r.id === "cmnd_dong_thua_ke").active = true;
                    wf.requirements.find(r => r.id === "vb_tu_choi").active = true;
                    wf.notes.push("Nhiều đồng thừa kế: TẤT CẢ phải ký trên Văn bản phân chia di sản. Nếu có người vắng mặt, cần Giấy ủy quyền có công chứng.");
                    wf.notes.push("Nếu có đồng thừa kế từ chối nhận di sản → cần Văn bản từ chối nhận di sản có công chứng/chứng thực (Điều 620 BLDS 2015).");
                },
            },
            {
                id: "thua_ke_mot_nguoi",
                condition: (ctx) => ctx.multipleHeirs === "no",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "vb_khai_nhan").active = true;
                },
            },
            {
                id: "mien_thue_vo_chong_tk",
                condition: (ctx) => ctx.relationship === "spouse",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "thue_tncn").active = false;
                    wf.fees.find(f => f.id === "lptb").active = false;
                    wf.notes.push("✅ MIỄN thuế TNCN và lệ phí trước bạ — thừa kế giữa vợ chồng.");
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_con_tk",
                condition: (ctx) => ctx.relationship === "parent_child",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "thue_tncn").active = false;
                    wf.notes.push("✅ MIỄN thuế TNCN — thừa kế từ cha mẹ cho con (Khoản 4, Điều 4 Luật Thuế TNCN).");
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_chau_tk",
                condition: (ctx) => ctx.relationship === "grandparent",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "thue_tncn").active = false;
                    wf.notes.push("✅ MIỄN thuế TNCN — thừa kế ông bà cho cháu.");
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_con_dau_re_tk",
                condition: (ctx) => ctx.relationship === "in_law",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "lptb").active = false;
                    wf.notes.push("✅ MIỄN lệ phí trước bạ — thừa kế cho con dâu/rể (NĐ 175/2025/NĐ-CP).");
                    wf.notes.push("⏳ Thuế TNCN: hiện vẫn phải nộp 2%. Từ 01/7/2026, sẽ được MIỄN theo Luật Thuế TNCN 2025.");
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "mien_thue_anh_chi_em_tk",
                condition: (ctx) => ctx.relationship === "sibling",
                apply: (wf) => {
                    wf.fees.find(f => f.id === "lptb").active = false;
                    wf.notes.push("✅ MIỄN lệ phí trước bạ — thừa kế giữa anh chị em ruột (NĐ 175/2025/NĐ-CP).");
                    wf.notes.push("⏳ Thuế TNCN: hiện vẫn phải nộp 2%. Từ 01/7/2026, sẽ được MIỄN theo Luật Thuế TNCN 2025.");
                    wf.requirements.find(r => r.id === "giay_mien_thue").active = true;
                },
            },
            {
                id: "khong_mien_other",
                condition: (ctx) => ctx.relationship === "other",
                apply: (wf) => {
                    wf.warnings.push("⚠️ Không thuộc diện miễn thuế TNCN hay lệ phí trước bạ. Phải nộp đầy đủ.");
                },
            },
            {
                id: "diff_province_tk",
                condition: (ctx) => ctx.sameProvince === "no",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "xac_nhan_cu_tru").active = true;
                    wf.requirements.find(r => r.id === "xac_nhan_cu_tru").required = true;
                },
            },
        ],
    },

    the_chap_bds: {
        id: "the_chap_bds",
        name: "Thế chấp bất động sản (vay ngân hàng)",
        shortName: "Thế chấp BĐS",
        category: "the-chap",
        icon: "🏦",
        agency: "Văn phòng đăng ký đất đai",
        level: "Quận/Huyện",
        estimatedDays: "7–15 ngày làm việc",
        legalBasis: [
            "Luật Đất đai 2024 (Điều 27, 45)",
            "Bộ luật Dân sự 2015 (Điều 317–327)",
            "Nghị định 99/2022/NĐ-CP (đăng ký biện pháp bảo đảm)",
            "Luật Công chứng 2024 (Điều 42, 43)",
            "Thông tư 08/2023/TT-BTNMT (đăng ký đất đai)",
        ],
        intake: [
            { id: "propertyType", question: "Loại bất động sản thế chấp?", type: "radio", options: [{ value: "dat_nen", label: "Đất nền" }, { value: "nha_dat", label: "Nhà đất" }, { value: "can_ho", label: "Căn hộ chung cư" }] },
            { id: "borrowerMarital", question: "Tình trạng hôn nhân người vay?", type: "radio", options: [{ value: "single", label: "Độc thân / Ly hôn / Góa" }, { value: "married", label: "Đã kết hôn" }] },
            { id: "assetType", question: "BĐS thuộc tài sản chung hay riêng?", type: "radio", options: [{ value: "shared", label: "Tài sản chung vợ chồng" }, { value: "separate", label: "Tài sản riêng" }], showIf: (ctx) => ctx.borrowerMarital === "married" },
            { id: "loanPurpose", question: "Mục đích vay?", type: "radio", options: [{ value: "mua_bds", label: "Mua bất động sản" }, { value: "kinh_doanh", label: "Kinh doanh" }, { value: "tieu_dung", label: "Tiêu dùng" }, { value: "khac", label: "Khác" }] },
            { id: "hasExistingMortgage", question: "BĐS đã có thế chấp khác chưa?", type: "radio", options: [{ value: "no", label: "Chưa — lần đầu thế chấp" }, { value: "yes", label: "Đã thế chấp (thế chấp bổ sung)" }] },
        ],
        baseFees: [
            { id: "phi_dang_ky", name: "Phí đăng ký thế chấp", amount: "80.000 – 100.000 đồng/lần", active: true },
            { id: "phi_cong_chung", name: "Phí công chứng HĐ thế chấp", amount: "Theo biểu phí công chứng", active: true },
            { id: "phi_tham_dinh_nh", name: "Phí thẩm định tài sản (ngân hàng)", amount: "Theo quy định ngân hàng", active: true },
        ],
        baseEligibility: [
            { id: "has_gcn", question: "BĐS đã có Giấy chứng nhận (sổ đỏ/sổ hồng)?", failMessage: "BĐS chưa có GCN không thể thế chấp.", active: true },
            { id: "no_dispute", question: "BĐS không có tranh chấp?", failMessage: "Đất đang tranh chấp không được thế chấp.", active: true },
            { id: "no_seizure", question: "BĐS không bị kê biên?", failMessage: "BĐS bị kê biên không được thế chấp.", active: true },
            { id: "within_term", question: "Đất còn trong thời hạn sử dụng?", failMessage: "Cần gia hạn trước.", active: true },
        ],
        baseRequirements: [
            { id: "gcn", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_nguoi_vay", name: "CMND/CCCD người vay (bản sao + gốc đối chiếu)", required: true, active: true, group: "cong_chung" },
            { id: "cmnd_vo_chong", name: "CMND/CCCD vợ/chồng người vay", required: true, active: false, forContext: "shared_asset", group: "cong_chung" },
            { id: "hon_nhan", name: "Giấy xác nhận tình trạng hôn nhân", required: true, active: true, group: "cong_chung" },
            { id: "dang_ky_ket_hon", name: "Giấy đăng ký kết hôn", required: true, active: false, forContext: "married", group: "cong_chung" },
            { id: "hop_dong_tin_dung", name: "Hợp đồng tín dụng / Hợp đồng vay vốn", required: true, active: true, group: "cong_chung", note: "Do ngân hàng soạn" },
            { id: "hop_dong_the_chap", name: "Hợp đồng thế chấp QSDĐ (có công chứng)", required: true, active: true, group: "cong_chung" },
            { id: "don_dang_ky_tc", name: "Đơn đăng ký thế chấp", required: true, active: true, group: "bien_dong" },
            { id: "hop_dong_tc_goc", name: "Hợp đồng thế chấp đã công chứng (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "gcn_goc_bd", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "bien_dong" },
        ],
        baseSteps: [
            { order: 1, id: "tham_dinh", title: "Ngân hàng thẩm định tài sản", instruction: "Ngân hàng cử nhân viên thẩm định BĐS: kiểm tra pháp lý, định giá, xác minh vị trí.", location: "Tại BĐS + Chi nhánh ngân hàng", estimatedTime: "3–7 ngày", tip: "Chuẩn bị đầy đủ GCN gốc, CMND, sổ hộ khẩu để ngân hàng kiểm tra.", active: true },
            { order: 2, id: "ky_hop_dong", title: "Ký hợp đồng tín dụng + thế chấp", instruction: "Ký hợp đồng vay vốn tại ngân hàng. Sau đó đến Văn phòng công chứng ký hợp đồng thế chấp.", location: "Ngân hàng + Văn phòng Công chứng", estimatedTime: "1–2 ngày", tip: "Vợ/chồng (nếu tài sản chung) PHẢI cùng ký. Đọc kỹ lãi suất, điều kiện trả nợ trước khi ký.", active: true },
            { order: 3, id: "dang_ky_the_chap", title: "Đăng ký thế chấp tại VPĐKĐĐ", instruction: "Nộp hồ sơ đăng ký thế chấp tại Văn phòng đăng ký đất đai. VPĐKĐĐ ghi nhận thế chấp trên GCN.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "3–5 ngày", tip: "Sau khi đăng ký, GCN gốc được giao cho ngân hàng giữ.", active: true },
            { order: 4, id: "giai_ngan", title: "Ngân hàng giải ngân", instruction: "Sau khi hoàn tất đăng ký thế chấp, ngân hàng tiến hành giải ngân khoản vay.", location: "Chi nhánh ngân hàng", estimatedTime: "1–3 ngày", tip: "Giữ biên bản bàn giao GCN cho ngân hàng. Lưu bản sao HĐ thế chấp.", active: true },
        ],
        baseForms: ["mau01a_dk_bao_dam", "giay_uy_quyen"],
        rules: [
            { id: "married_borrower", condition: (ctx) => ctx.borrowerMarital === "married", apply: (wf) => { wf.requirements.find(r => r.id === "dang_ky_ket_hon").active = true; } },
            { id: "shared_asset_tc", condition: (ctx) => ctx.borrowerMarital === "married" && ctx.assetType === "shared", apply: (wf) => {
                wf.requirements.find(r => r.id === "cmnd_vo_chong").active = true;
                wf.notes.push("BĐS là tài sản chung → vợ/chồng PHẢI cùng ký hợp đồng thế chấp tại văn phòng công chứng.");
                wf.eligibility.push({ id: "spouse_agree", question: "Vợ/chồng đồng ý thế chấp?", failMessage: "Cần có sự đồng ý của cả hai vợ chồng (Điều 35 Luật HNGĐ 2014).", active: true });
            }},
            { id: "existing_mortgage", condition: (ctx) => ctx.hasExistingMortgage === "yes", apply: (wf) => {
                wf.warnings.push("⚠️ BĐS đã thế chấp tại ngân hàng khác — cần có sự đồng ý của bên nhận thế chấp trước đó. Thực tế rất ít ngân hàng chấp nhận thế chấp bổ sung.");
            }},
        ],
    },

    xoa_the_chap: {
        id: "xoa_the_chap",
        name: "Xóa đăng ký thế chấp (giải chấp)",
        shortName: "Giải chấp",
        category: "the-chap",
        icon: "🔓",
        agency: "Văn phòng đăng ký đất đai",
        level: "Quận/Huyện",
        estimatedDays: "3–7 ngày làm việc",
        legalBasis: [
            "Bộ luật Dân sự 2015 (Điều 327)",
            "Nghị định 99/2022/NĐ-CP (Điều 21 — xóa đăng ký biện pháp bảo đảm)",
            "Thông tư 08/2023/TT-BTNMT",
        ],
        intake: [
            { id: "releaseReason", question: "Lý do giải chấp?", type: "radio", options: [{ value: "paid_off", label: "Đã trả hết nợ" }, { value: "refinance", label: "Chuyển sang ngân hàng khác (tái thế chấp)" }, { value: "partial", label: "Giải chấp một phần" }] },
            { id: "bankWillSubmit", question: "Ngân hàng tự nộp hồ sơ xóa thế chấp?", type: "radio", options: [{ value: "yes", label: "Có — ngân hàng nộp hộ" }, { value: "no", label: "Không — tự nộp" }] },
        ],
        baseFees: [
            { id: "phi_xoa_dang_ky", name: "Phí xóa đăng ký thế chấp", amount: "20.000 đồng/lần", active: true },
        ],
        baseEligibility: [
            { id: "loan_cleared", question: "Đã thanh toán hết nợ vay (gốc + lãi)?", failMessage: "Phải trả hết nợ trước khi xóa thế chấp. Liên hệ ngân hàng xác nhận.", active: true },
            { id: "bank_agrees", question: "Ngân hàng đồng ý giải chấp và trả GCN?", failMessage: "Cần ngân hàng ký văn bản đồng ý xóa thế chấp.", active: true },
        ],
        baseRequirements: [
            { id: "don_xoa_tc", name: "Đơn yêu cầu xóa đăng ký thế chấp", required: true, active: true, group: "bien_dong" },
            { id: "hop_dong_the_chap", name: "Hợp đồng thế chấp (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "vb_dong_y_giai_chap", name: "Văn bản đồng ý giải chấp của ngân hàng", required: true, active: true, group: "bien_dong", note: "Ngân hàng cấp sau khi xác nhận trả hết nợ" },
            { id: "gcn_goc", name: "Giấy chứng nhận QSDĐ (bản gốc — ngân hàng trả lại)", required: true, active: true, group: "bien_dong" },
            { id: "cmnd", name: "CMND/CCCD chủ sở hữu", required: true, active: true, group: "bien_dong" },
            { id: "xac_nhan_tra_no", name: "Giấy xác nhận đã tất toán khoản vay", required: true, active: true, group: "bien_dong" },
        ],
        baseSteps: [
            { order: 1, id: "tat_toan", title: "Tất toán khoản vay tại ngân hàng", instruction: "Thanh toán hết gốc + lãi. Nhận giấy xác nhận tất toán từ ngân hàng.", location: "Chi nhánh ngân hàng", estimatedTime: "1–3 ngày", tip: "Yêu cầu ngân hàng cấp: (1) Giấy xác nhận tất toán, (2) Văn bản đồng ý giải chấp, (3) Trả lại GCN gốc.", active: true },
            { order: 2, id: "nop_ho_so", title: "Nộp hồ sơ xóa đăng ký thế chấp", instruction: "Nộp hồ sơ tại VPĐKĐĐ hoặc Bộ phận một cửa. Nhiều ngân hàng tự nộp hộ.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "1 ngày nộp, 3–5 ngày xử lý", tip: "Kiểm tra xem ngân hàng nộp hộ hay mình phải tự nộp.", active: true },
            { order: 3, id: "nhan_gcn", title: "Nhận GCN đã xóa thế chấp", instruction: "Nhận lại GCN gốc đã xóa ghi chú thế chấp.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "Theo giấy hẹn", tip: "Kiểm tra GCN: phần ghi chú thế chấp đã được xóa. Giữ GCN gốc cẩn thận.", active: true },
        ],
        baseForms: ["mau03a_xoa_dk"],
        rules: [
            { id: "refinance", condition: (ctx) => ctx.releaseReason === "refinance", apply: (wf) => {
                wf.notes.push("Tái thế chấp sang ngân hàng khác: cần phối hợp giữa ngân hàng cũ và mới. Thường ngân hàng mới sẽ giải ngân để tất toán ngân hàng cũ.");
            }},
            { id: "partial_release", condition: (ctx) => ctx.releaseReason === "partial", apply: (wf) => {
                wf.notes.push("Giải chấp một phần: cần ngân hàng đồng ý giảm tài sản đảm bảo. Thường chỉ áp dụng khi đã trả được phần lớn khoản vay.");
            }},
        ],
    },

    tach_thua_dat: {
        id: "tach_thua_dat",
        name: "Tách thửa / Hợp thửa đất",
        shortName: "Tách thửa",
        category: "thu-tuc-dat",
        icon: "📐",
        agency: "Văn phòng đăng ký đất đai",
        level: "Quận/Huyện",
        estimatedDays: "15–30 ngày làm việc",
        legalBasis: [
            "Luật Đất đai 2024 (Điều 220, 221)",
            "Nghị định 101/2024/NĐ-CP (Điều 13, 14)",
            "Nghị định 151/2025/NĐ-CP (thay thế biểu mẫu đăng ký đất đai — hiệu lực 01/7/2025)",
            "Thông tư 08/2023/TT-BTNMT",
            "Quy định UBND tỉnh/TP về diện tích tối thiểu tách thửa",
        ],
        intake: [
            { id: "splitType", question: "Tách thửa hay hợp thửa?", type: "radio", options: [{ value: "tach", label: "Tách thửa (chia nhỏ)" }, { value: "hop", label: "Hợp thửa (gộp lại)" }] },
            { id: "landUse", question: "Mục đích sử dụng đất hiện tại?", type: "radio", options: [{ value: "dat_o", label: "Đất ở (ONT/ODT)" }, { value: "dat_nong_nghiep", label: "Đất nông nghiệp (CLN/HNK)" }, { value: "dat_hon_hop", label: "Đất hỗn hợp (có nhiều mục đích)" }] },
            { id: "splitReason", question: "Lý do tách/hợp thửa?", type: "radio", options: [{ value: "chia_gia_dinh", label: "Chia đất cho con / gia đình" }, { value: "ban_mot_phan", label: "Bán một phần đất" }, { value: "khac", label: "Lý do khác" }] },
            { id: "ownerMarital", question: "Tình trạng hôn nhân chủ đất?", type: "radio", options: [{ value: "single", label: "Độc thân" }, { value: "married", label: "Đã kết hôn" }] },
        ],
        baseFees: [
            { id: "phi_do_dac", name: "Phí đo đạc, trích lục", amount: "Theo quy định địa phương (1–5 triệu)", active: true },
            { id: "phi_tham_dinh", name: "Phí thẩm định hồ sơ", amount: "Theo quy định địa phương", active: true },
            { id: "le_phi_gcn", name: "Lệ phí cấp GCN mới", amount: "50.000 – 100.000 đồng/GCN", active: true },
        ],
        baseEligibility: [
            { id: "has_gcn", question: "Đất đã có Giấy chứng nhận?", failMessage: "Phải có GCN mới tách/hợp thửa được.", active: true },
            { id: "no_dispute", question: "Đất không có tranh chấp?", failMessage: "Đất đang tranh chấp không được tách thửa.", active: true },
            { id: "no_seizure", question: "Đất không bị kê biên?", failMessage: "Đất bị kê biên không được tách thửa.", active: true },
            { id: "min_area", question: "Diện tích sau tách ≥ diện tích tối thiểu theo quy định?", failMessage: "Mỗi thửa đất sau khi tách phải đạt diện tích tối thiểu theo quy định UBND tỉnh/TP. VD: HN ≥ 30m², HCM ≥ 36m² (đất ở đô thị).", active: true },
            { id: "quy_hoach", question: "Phù hợp quy hoạch sử dụng đất?", failMessage: "Đất nằm trong khu vực quy hoạch có thể bị hạn chế tách thửa.", active: true },
        ],
        baseRequirements: [
            { id: "don_tach_thua", name: "Đơn đề nghị tách thửa / hợp thửa đất", required: true, active: true, group: "bien_dong" },
            { id: "gcn_goc", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "cmnd", name: "CMND/CCCD chủ sở hữu", required: true, active: true, group: "bien_dong" },
            { id: "cmnd_vo_chong", name: "CMND/CCCD vợ/chồng chủ đất", required: true, active: false, forContext: "married_owner", group: "bien_dong" },
            { id: "ho_khau", name: "Sổ hộ khẩu / Xác nhận cư trú", required: true, active: true, group: "bien_dong" },
            { id: "ban_ve", name: "Sơ đồ / Bản vẽ phân chia thửa đất", required: true, active: true, group: "bien_dong", note: "Do đơn vị đo đạc lập" },
            { id: "vb_dong_y_vo_chong", name: "Văn bản đồng ý tách thửa của vợ/chồng", required: true, active: false, forContext: "married_owner", group: "bien_dong" },
        ],
        baseSteps: [
            { order: 1, id: "do_dac", title: "Đo đạc, lập bản vẽ phân chia", instruction: "Liên hệ đơn vị đo đạc (tư nhân hoặc Trung tâm đo đạc bản đồ) để đo đạc thực tế và lập bản vẽ phân chia thửa đất.", location: "Tại thửa đất", estimatedTime: "3–7 ngày", tip: "Chọn đơn vị đo đạc có giấy phép. Chi phí đo đạc tùy diện tích và địa phương.", active: true },
            { order: 2, id: "nop_ho_so", title: "Nộp hồ sơ tách thửa", instruction: "Nộp đơn + GCN + bản vẽ + giấy tờ tùy thân tại VPĐKĐĐ hoặc Bộ phận một cửa.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "1 ngày nộp", tip: "Kiểm tra diện tích tối thiểu theo quy định địa phương TRƯỚC khi nộp.", active: true },
            { order: 3, id: "tham_dinh", title: "Thẩm định hồ sơ", instruction: "VPĐKĐĐ thẩm định: kiểm tra quy hoạch, diện tích tối thiểu, tính hợp pháp. Trình UBND quận/huyện ra quyết định.", location: "VPĐKĐĐ", estimatedTime: "10–15 ngày", tip: "Nếu hồ sơ thiếu, sẽ có thông báo bổ sung.", active: true },
            { order: 4, id: "nhan_gcn", title: "Nhận GCN mới", instruction: "Nhận GCN mới cho các thửa đất sau khi tách. GCN cũ bị thu hồi.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "Theo giấy hẹn", tip: "Kiểm tra kỹ diện tích, mục đích SDĐ trên mỗi GCN mới.", active: true },
        ],
        baseForms: ["mau21", "mau01lptb"],
        rules: [
            { id: "married_owner", condition: (ctx) => ctx.ownerMarital === "married", apply: (wf) => {
                wf.requirements.find(r => r.id === "cmnd_vo_chong").active = true;
                wf.requirements.find(r => r.id === "vb_dong_y_vo_chong").active = true;
                wf.notes.push("BĐS là tài sản chung → vợ/chồng phải đồng ý tách thửa (ký trên đơn hoặc có văn bản đồng ý).");
            }},
            { id: "dat_nong_nghiep", condition: (ctx) => ctx.landUse === "dat_nong_nghiep", apply: (wf) => {
                wf.notes.push("Đất nông nghiệp: diện tích tối thiểu sau tách thường lớn hơn đất ở. Kiểm tra quy định UBND tỉnh/TP.");
                wf.warnings.push("⚠️ Tách thửa đất nông nghiệp để bán nền có thể bị từ chối nếu không phù hợp quy hoạch. Cần chuyển mục đích SDĐ trước.");
            }},
            { id: "hop_thua", condition: (ctx) => ctx.splitType === "hop", apply: (wf) => {
                wf.notes.push("Hợp thửa: các thửa đất phải liền kề, cùng chủ sở hữu, cùng mục đích sử dụng.");
            }},
        ],
    },

    cap_gcn_lan_dau: {
        id: "cap_gcn_lan_dau",
        name: "Cấp Giấy chứng nhận QSDĐ lần đầu",
        shortName: "Cấp sổ đỏ",
        category: "thu-tuc-dat",
        icon: "📕",
        agency: "UBND quận/huyện",
        level: "Quận/Huyện",
        estimatedDays: "30–60 ngày làm việc",
        legalBasis: [
            "Luật Đất đai 2024 (Điều 136–139)",
            "Nghị định 101/2024/NĐ-CP (Điều 7–12)",
            "Nghị định 151/2025/NĐ-CP (thay thế biểu mẫu đăng ký đất đai — hiệu lực 01/7/2025)",
            "Thông tư 08/2023/TT-BTNMT",
        ],
        intake: [
            { id: "landDocType", question: "Hiện có giấy tờ gì về quyền sử dụng đất?", type: "radio", options: [
                { value: "giay_to_cu", label: "Giấy tờ cũ (trước Luật Đất đai 2003)" },
                { value: "quyet_dinh_giao", label: "Quyết định giao đất / cho thuê đất của UBND" },
                { value: "ho_so_khai_hoang", label: "Đất khai hoang / Sử dụng ổn định (không có giấy tờ)" },
                { value: "hop_dong_mua", label: "Giấy tờ mua bán viết tay (chưa công chứng)" },
            ]},
            { id: "usageDuration", question: "Đã sử dụng đất từ trước thời điểm nào?", type: "radio", options: [
                { value: "before_1993", label: "Trước 15/10/1993" },
                { value: "1993_2004", label: "Từ 15/10/1993 đến 01/7/2004" },
                { value: "after_2004", label: "Sau 01/7/2004" },
            ]},
            { id: "landUse", question: "Mục đích sử dụng đất?", type: "radio", options: [{ value: "dat_o", label: "Đất ở" }, { value: "dat_nong_nghiep", label: "Đất nông nghiệp" }, { value: "khac", label: "Khác" }] },
            { id: "hasBuilding", question: "Trên đất có nhà/công trình xây dựng?", type: "radio", options: [{ value: "yes", label: "Có nhà/công trình" }, { value: "no", label: "Chỉ có đất" }] },
        ],
        baseFees: [
            { id: "phi_do_dac", name: "Phí đo đạc, lập hồ sơ địa chính", amount: "Theo quy định địa phương", active: true },
            { id: "phi_tham_dinh", name: "Phí thẩm định hồ sơ cấp GCN", amount: "Theo quy định địa phương", active: true },
            { id: "le_phi_gcn", name: "Lệ phí cấp GCN", amount: "50.000 – 100.000 đồng", active: true },
            { id: "tien_su_dung_dat", name: "Tiền sử dụng đất (nếu phải nộp)", amount: "Theo bảng giá đất UBND", active: true },
            { id: "lptb", name: "Lệ phí trước bạ", amount: "0.5% giá trị đất theo bảng giá UBND", active: true },
        ],
        baseEligibility: [
            { id: "no_dispute", question: "Đất không có tranh chấp?", failMessage: "Đất đang tranh chấp không cấp GCN. Giải quyết tranh chấp trước.", active: true },
            { id: "stable_use", question: "Sử dụng đất ổn định, không vi phạm pháp luật đất đai?", failMessage: "Đất phải sử dụng ổn định, không lấn chiếm, không vi phạm.", active: true },
            { id: "phù_hợp_quy_hoạch", question: "Phù hợp quy hoạch sử dụng đất?", failMessage: "Đất không phù hợp quy hoạch có thể bị từ chối cấp GCN.", active: true },
        ],
        baseRequirements: [
            { id: "don_dang_ky", name: "Đơn đăng ký, cấp GCN QSDĐ", required: true, active: true, group: "bien_dong" },
            { id: "giay_to_nguon_goc", name: "Giấy tờ về nguồn gốc đất (giấy tờ cũ, quyết định giao đất, giấy viết tay...)", required: true, active: true, group: "bien_dong", note: "Tùy trường hợp, xem danh sách giấy tờ theo Điều 137 Luật Đất đai 2024" },
            { id: "cmnd", name: "CMND/CCCD chủ sử dụng đất", required: true, active: true, group: "bien_dong" },
            { id: "ho_khau", name: "Sổ hộ khẩu / Xác nhận cư trú", required: true, active: true, group: "bien_dong" },
            { id: "ban_do", name: "Trích đo, trích lục bản đồ địa chính thửa đất", required: true, active: true, group: "bien_dong", note: "Do đơn vị đo đạc thực hiện" },
            { id: "xac_nhan_ubnd", name: "Xác nhận của UBND xã/phường về nguồn gốc, thời điểm sử dụng đất", required: true, active: true, group: "bien_dong" },
            { id: "giay_to_nha", name: "Giấy phép xây dựng / Giấy tờ chứng minh nhà ở hợp pháp", required: true, active: false, forContext: "has_building", group: "bien_dong" },
            { id: "to_khai_lptb", name: "Tờ khai lệ phí trước bạ (Mẫu 01/LPTB)", required: true, active: true, group: "thue" },
        ],
        baseSteps: [
            { order: 1, id: "do_dac", title: "Đo đạc lập bản đồ địa chính", instruction: "Liên hệ đơn vị đo đạc để đo đạc thửa đất, lập trích đo bản đồ địa chính.", location: "Tại thửa đất", estimatedTime: "5–10 ngày", tip: "Yêu cầu bản trích đo đúng chuẩn, có xác nhận của đơn vị đo đạc.", active: true },
            { order: 2, id: "xac_nhan_ubnd", title: "Xác nhận của UBND xã/phường", instruction: "UBND xã/phường xác nhận nguồn gốc đất, thời điểm sử dụng, tình trạng tranh chấp.", location: "UBND xã/phường", estimatedTime: "5–7 ngày", tip: "Thời điểm sử dụng đất rất quan trọng — quyết định có phải nộp tiền SDĐ hay không.", active: true },
            { order: 3, id: "nop_ho_so", title: "Nộp hồ sơ cấp GCN", instruction: "Nộp đầy đủ hồ sơ tại VPĐKĐĐ hoặc Bộ phận một cửa.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "1 ngày nộp", tip: "Chuẩn bị đầy đủ, nộp 01 bộ.", active: true },
            { order: 4, id: "niem_yet", title: "Niêm yết công khai", instruction: "UBND xã/phường niêm yết hồ sơ 15 ngày để xác nhận không có tranh chấp.", location: "UBND xã/phường nơi có đất", estimatedTime: "15 ngày", tip: "Trong thời gian niêm yết, nếu có khiếu nại sẽ được giải quyết.", active: true },
            { order: 5, id: "tham_dinh", title: "Thẩm định và cấp GCN", instruction: "VPĐKĐĐ thẩm định, trình UBND quận/huyện quyết định cấp GCN.", location: "VPĐKĐĐ → UBND quận/huyện", estimatedTime: "10–20 ngày", tip: "Nếu phải nộp tiền SDĐ, sẽ nhận thông báo nộp tiền trước khi cấp GCN.", active: true },
            { order: 6, id: "nhan_gcn", title: "Nhận Giấy chứng nhận", instruction: "Nhận GCN tại nơi nộp hồ sơ.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "Theo giấy hẹn", tip: "Kiểm tra kỹ thông tin: tên, diện tích, mục đích SDĐ, thời hạn.", active: true },
        ],
        baseForms: ["mau04_nd151", "mau01lptb"],
        rules: [
            { id: "has_building", condition: (ctx) => ctx.hasBuilding === "yes", apply: (wf) => {
                wf.requirements.find(r => r.id === "giay_to_nha").active = true;
                wf.notes.push("Có nhà trên đất: cần bổ sung giấy phép xây dựng hoặc giấy tờ chứng minh nhà xây hợp pháp. Nếu nhà xây trước 01/7/2004 có thể không cần GPXD.");
            }},
            { id: "no_papers", condition: (ctx) => ctx.landDocType === "ho_so_khai_hoang", apply: (wf) => {
                wf.warnings.push("⚠️ Đất không có giấy tờ: phải sử dụng ổn định trước 15/10/1993 và không vi phạm mới được cấp GCN. Cần xác nhận UBND xã/phường.");
                wf.notes.push("Trường hợp không có giấy tờ, đất sử dụng ổn định trước 15/10/1993: được cấp GCN, không phải nộp tiền SDĐ (Điều 137 Luật Đất đai 2024).");
            }},
            { id: "viet_tay", condition: (ctx) => ctx.landDocType === "hop_dong_mua", apply: (wf) => {
                wf.warnings.push("⚠️ Giấy tờ mua bán viết tay (chưa công chứng): chỉ được cấp GCN nếu giao dịch xảy ra trước 01/7/2004 và đất không tranh chấp.");
            }},
            { id: "before_1993_free", condition: (ctx) => ctx.usageDuration === "before_1993", apply: (wf) => {
                wf.fees.find(f => f.id === "tien_su_dung_dat").active = false;
                wf.notes.push("✅ Sử dụng đất ổn định trước 15/10/1993: KHÔNG phải nộp tiền sử dụng đất khi cấp GCN.");
            }},
        ],
    },

    chuyen_muc_dich_sdd: {
        id: "chuyen_muc_dich_sdd",
        name: "Chuyển mục đích sử dụng đất",
        shortName: "Chuyển MĐSDĐ",
        category: "thu-tuc-dat",
        icon: "🔄",
        agency: "UBND quận/huyện",
        level: "Quận/Huyện",
        estimatedDays: "20–45 ngày làm việc",
        legalBasis: [
            "Luật Đất đai 2024 (Điều 121, 122, 155–158)",
            "Nghị định 101/2024/NĐ-CP",
            "Nghị định 151/2025/NĐ-CP (thay thế biểu mẫu đăng ký đất đai — hiệu lực 01/7/2025)",
            "Thông tư 08/2023/TT-BTNMT",
        ],
        intake: [
            { id: "currentPurpose", question: "Mục đích sử dụng đất hiện tại?", type: "radio", options: [
                { value: "nong_nghiep", label: "Đất nông nghiệp (CLN/HNK/NHK)" },
                { value: "dat_o_nong_thon", label: "Đất ở nông thôn (ONT)" },
                { value: "phi_nong_nghiep", label: "Đất phi nông nghiệp khác" },
            ]},
            { id: "targetPurpose", question: "Mục đích muốn chuyển sang?", type: "radio", options: [
                { value: "dat_o", label: "Đất ở (ODT — đô thị / ONT — nông thôn)" },
                { value: "dat_kinh_doanh", label: "Đất sản xuất kinh doanh" },
                { value: "khac", label: "Mục đích khác" },
            ]},
            { id: "ownerMarital", question: "Tình trạng hôn nhân?", type: "radio", options: [{ value: "single", label: "Độc thân" }, { value: "married", label: "Đã kết hôn" }] },
        ],
        baseFees: [
            { id: "tien_su_dung_dat", name: "Tiền sử dụng đất (chênh lệch)", amount: "= Giá đất mới − Giá đất cũ (theo bảng giá UBND)", active: true },
            { id: "phi_tham_dinh", name: "Phí thẩm định", amount: "Theo quy định địa phương", active: true },
            { id: "le_phi_gcn", name: "Lệ phí cấp GCN mới", amount: "50.000 – 100.000 đồng", active: true },
            { id: "lptb", name: "Lệ phí trước bạ (phần chênh lệch)", amount: "0.5% × chênh lệch giá trị đất", active: true },
        ],
        baseEligibility: [
            { id: "has_gcn", question: "Đất đã có Giấy chứng nhận?", failMessage: "Phải có GCN mới được chuyển mục đích SDĐ.", active: true },
            { id: "phu_hop_quy_hoach", question: "Phù hợp quy hoạch sử dụng đất?", failMessage: "Chỉ được chuyển mục đích khi phù hợp quy hoạch SDĐ đã được phê duyệt.", active: true },
            { id: "phu_hop_ke_hoach", question: "Thuộc kế hoạch sử dụng đất hàng năm?", failMessage: "Phải nằm trong kế hoạch SDĐ hàng năm của UBND cấp huyện.", active: true },
            { id: "no_dispute", question: "Đất không có tranh chấp?", failMessage: "Đất đang tranh chấp không được chuyển mục đích.", active: true },
        ],
        baseRequirements: [
            { id: "don_xin", name: "Đơn xin chuyển mục đích sử dụng đất", required: true, active: true, group: "bien_dong" },
            { id: "gcn_goc", name: "Giấy chứng nhận QSDĐ (bản gốc)", required: true, active: true, group: "bien_dong" },
            { id: "cmnd", name: "CMND/CCCD chủ sở hữu", required: true, active: true, group: "bien_dong" },
            { id: "ho_khau", name: "Sổ hộ khẩu / Xác nhận cư trú", required: true, active: true, group: "bien_dong" },
            { id: "to_khai_lptb", name: "Tờ khai lệ phí trước bạ (Mẫu 01/LPTB)", required: true, active: true, group: "thue" },
            { id: "to_khai_tien_sdd", name: "Tờ khai tiền sử dụng đất", required: true, active: true, group: "thue" },
        ],
        baseSteps: [
            { order: 1, id: "kiem_tra_qh", title: "Kiểm tra quy hoạch", instruction: "Tra cứu quy hoạch SDĐ tại UBND quận/huyện hoặc phòng TNMT để xác nhận đất được phép chuyển mục đích.", location: "UBND quận/huyện / Phòng TN&MT", estimatedTime: "1–3 ngày", tip: "Có thể tra cứu trực tuyến trên cổng thông tin quy hoạch đô thị của tỉnh/TP.", active: true },
            { order: 2, id: "nop_don", title: "Nộp đơn xin chuyển mục đích SDĐ", instruction: "Nộp đơn + hồ sơ tại UBND quận/huyện hoặc Bộ phận một cửa.", location: "UBND quận/huyện / Bộ phận một cửa", estimatedTime: "1 ngày", tip: "Nộp kèm GCN gốc, CMND, sổ hộ khẩu.", active: true },
            { order: 3, id: "tham_dinh", title: "Thẩm định và ra quyết định", instruction: "Phòng TN&MT thẩm định. UBND quận/huyện ra quyết định cho phép chuyển MĐSDĐ.", location: "Phòng TN&MT → UBND quận/huyện", estimatedTime: "15–25 ngày", tip: "Nếu được duyệt, sẽ nhận quyết định cho phép chuyển MĐSDĐ.", active: true },
            { order: 4, id: "nop_tien", title: "Nộp tiền sử dụng đất + LPTB", instruction: "Nộp tiền SDĐ (phần chênh lệch) và lệ phí trước bạ theo thông báo.", location: "Ngân hàng / Kho bạc Nhà nước", estimatedTime: "1–5 ngày", tip: "Tiền SDĐ = Giá đất mới − Giá đất cũ (theo bảng giá đất UBND). Nộp xong mới được cấp GCN mới.", active: true },
            { order: 5, id: "cap_gcn", title: "Cấp GCN mới (ghi mục đích mới)", instruction: "VPĐKĐĐ cập nhật mục đích SDĐ trên GCN hoặc cấp GCN mới.", location: "VPĐKĐĐ / Bộ phận một cửa", estimatedTime: "5–10 ngày", tip: "Kiểm tra GCN mới: mục đích SDĐ đã đổi sang đúng loại đất mong muốn.", active: true },
        ],
        baseForms: ["mau23", "mau01lptb"],
        rules: [
            { id: "nong_nghiep_to_o", condition: (ctx) => ctx.currentPurpose === "nong_nghiep" && ctx.targetPurpose === "dat_o", apply: (wf) => {
                wf.notes.push("Chuyển đất nông nghiệp → đất ở: phải nộp tiền SDĐ (phần chênh lệch). Đây là chi phí lớn nhất trong thủ tục này.");
                wf.notes.push("Tiền SDĐ = Giá đất ở (bảng giá UBND 2026) × diện tích. Có thể lên đến hàng trăm triệu đồng tùy vị trí.");
                wf.warnings.push("⚠️ Chỉ được chuyển khi đất nằm trong khu vực quy hoạch đất ở. Không phải đất nông nghiệp nào cũng chuyển được.");
            }},
            { id: "married_owner", condition: (ctx) => ctx.ownerMarital === "married", apply: (wf) => {
                wf.notes.push("Đất tài sản chung: vợ/chồng phải đồng ý và cùng ký đơn xin chuyển mục đích.");
            }},
        ],
    },

    cho_thue_bds: {
        id: "cho_thue_bds",
        name: "Khai thuế cá nhân cho thuê bất động sản",
        shortName: "Cho thuê BĐS",
        category: "cho-thue",
        icon: "🏘️",
        agency: "Chi cục Thuế quận/huyện",
        level: "Quận/Huyện",
        estimatedDays: "Kê khai định kỳ (năm)",
        legalBasis: [
            "Nghị định 144/2026/NĐ-CP (ngưỡng doanh thu 1 tỷ đồng/năm)",
            "Luật Thuế TNCN 2025 (109/2025/QH15) — hiệu lực 01/7/2026",
            "Luật Thuế GTGT 2025 — hiệu lực 01/7/2026",
            "Thông tư 80/2021/TT-BTC (mẫu tờ khai)",
            "Luật Quản lý thuế 2019 (38/2019/QH14)",
        ],

        intake: [
            {
                id: "tenantType",
                question: "Bên thuê BĐS là ai?",
                type: "radio",
                options: [
                    { value: "ca_nhan", label: "Cá nhân" },
                    { value: "doanh_nghiep", label: "Doanh nghiệp (DN)" },
                ],
            },
            {
                id: "dnKhaiThay",
                question: "Hợp đồng có thỏa thuận DN kê khai thuế thay?",
                type: "radio",
                options: [
                    { value: "yes", label: "Có — DN kê khai thay (Mẫu 01/TCKT)" },
                    { value: "no", label: "Không — cá nhân tự kê khai" },
                ],
                showIf: (ctx) => ctx.tenantType === "doanh_nghiep",
            },
            {
                id: "propertyCount",
                question: "Số lượng BĐS đang cho thuê?",
                type: "radio",
                options: [
                    { value: "1", label: "1 BĐS" },
                    { value: "nhieu", label: "2 BĐS trở lên" },
                ],
            },
            {
                id: "revenueRange",
                question: "Tổng doanh thu cho thuê BĐS dự kiến/năm?",
                type: "radio",
                options: [
                    { value: "duoi_1ty", label: "≤ 1 tỷ đồng/năm (không phải nộp thuế)" },
                    { value: "tren_1ty", label: "> 1 tỷ đồng/năm (phát sinh thuế GTGT + TNCN)" },
                ],
            },
            {
                id: "filingPeriod",
                question: "Kỳ kê khai mong muốn?",
                type: "radio",
                options: [
                    { value: "nam_1_lan", label: "Năm 1 lần (hạn 31/01 năm sau)" },
                    { value: "nam_2_lan", label: "Năm 2 lần (hạn 31/07 và 31/01)" },
                ],
                showIf: (ctx) => !(ctx.tenantType === "doanh_nghiep" && ctx.dnKhaiThay === "yes"),
            },
        ],

        baseFees: [
            { id: "thue_gtgt", name: "Thuế GTGT (5%)", amount: "5% × doanh thu cho thuê/năm", active: true },
            { id: "thue_tncn", name: "Thuế TNCN (5%)", amount: "5% × doanh thu cho thuê/năm", active: true },
        ],

        baseEligibility: [
            { id: "has_bds", question: "Có bất động sản đang cho thuê?", failMessage: "Chỉ áp dụng khi có BĐS cho thuê thực tế.", active: true },
            { id: "has_hop_dong", question: "Có hợp đồng cho thuê BĐS?", failMessage: "Cần có hợp đồng cho thuê (bằng văn bản) để làm căn cứ kê khai.", active: true },
            { id: "da_dang_ky_mst", question: "Đã đăng ký MST cho thuê BĐS (hoặc sẽ đăng ký)?", failMessage: "Cá nhân phải đăng ký MST cho thuê tài sản tại Chi cục Thuế trước khi kê khai. Sử dụng mẫu đăng ký MST (Mẫu 01-ĐK-TCT).", active: true },
        ],

        baseRequirements: [
            { id: "mst_cho_thue", name: "MST đã đăng ký cho thuê BĐS", required: true, active: true, group: "thue" },
            { id: "hop_dong_thue", name: "Hợp đồng cho thuê BĐS (bản sao)", required: true, active: true, group: "thue" },
            { id: "cmnd", name: "CMND/CCCD chủ BĐS (bản sao)", required: true, active: true, group: "thue" },
            { id: "gcn", name: "GCN QSDĐ / Giấy tờ chứng minh quyền sở hữu BĐS (bản sao)", required: true, active: true, group: "thue" },
            { id: "to_khai_01bds", name: "Tờ khai thuế Mẫu 01/BĐS", required: true, active: true, group: "thue" },
            { id: "bang_ke_01bk", name: "Phụ lục Bảng kê 01/BK-BĐS (nếu nhiều BĐS)", required: false, active: false, forContext: "nhieu_bds", group: "thue" },
            { id: "to_khai_01tckt", name: "Tờ khai thuế Mẫu 01/TCKT (DN khai thay)", required: true, active: false, forContext: "dn_khai_thay", group: "thue" },
        ],

        baseSteps: [
            { order: 1, id: "dang_ky_mst", title: "Đăng ký MST cho thuê BĐS", instruction: "Nộp hồ sơ đăng ký MST cho thuê tài sản tại Chi cục Thuế quận/huyện nơi có BĐS. Chỉ cần đăng ký 1 lần, dùng cho tất cả BĐS cho thuê.", location: "Chi cục Thuế quận/huyện", estimatedTime: "3–5 ngày", tip: "Nếu có thêm BĐS cho thuê mới → làm thủ tục thông báo bổ sung địa điểm kinh doanh, không cần đăng ký MST lại.", active: true },
            { order: 2, id: "ke_khai", title: "Kê khai thuế cho thuê BĐS", instruction: "Điền tờ khai Mẫu 01/BĐS và Phụ lục 01/BK-BĐS (nếu nhiều BĐS). Nộp tại Chi cục Thuế hoặc trực tuyến qua thuedientu.gdt.gov.vn.", location: "Chi cục Thuế / Trực tuyến", estimatedTime: "1 ngày", tip: "Dù doanh thu ≤ 1 tỷ (không phát sinh thuế) vẫn PHẢI kê khai. Doanh thu tính theo năm dương lịch, không theo năm hợp đồng.", active: true },
            { order: 3, id: "nop_thue", title: "Nộp thuế (nếu phát sinh)", instruction: "Nếu tổng doanh thu > 1 tỷ đồng/năm: nộp thuế GTGT 5% + TNCN 5% = 10% doanh thu. Nộp tại ngân hàng hoặc Kho bạc Nhà nước.", location: "Ngân hàng / Kho bạc Nhà nước", estimatedTime: "1 ngày", tip: "Ngưỡng 1 tỷ/năm tính cho TỔNG doanh thu tất cả BĐS cho thuê của 1 cá nhân (NĐ 144/2026/NĐ-CP). Giữ biên lai nộp thuế.", active: true },
        ],

        baseForms: ["mau01_bds", "mau01_bk_bds"],

        rules: [
            {
                id: "dn_khai_thay",
                condition: (ctx) => ctx.tenantType === "doanh_nghiep" && ctx.dnKhaiThay === "yes",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "to_khai_01tckt").active = true;
                    wf.requirements.find(r => r.id === "to_khai_01bds").active = false;
                    wf.requirements.find(r => r.id === "mst_cho_thue").active = false;
                    wf.notes.push("DN kê khai thay: DN sử dụng số CCCD/MST của cá nhân cho thuê để kê khai bằng Mẫu 01/TCKT. Cá nhân KHÔNG cần đăng ký MST cho thuê riêng.");
                    wf.notes.push("Thời hạn DN khai thay: Nếu trong tháng có nhiều kỳ thanh toán → khai theo tháng. Trường hợp khác → khai theo kỳ thanh toán (chậm nhất 10 ngày kể từ ngày đến hạn thanh toán).");
                    wf.steps[0].active = false;
                    wf.forms = [];
                },
            },
            {
                id: "ca_nhan_thue",
                condition: (ctx) => ctx.tenantType === "ca_nhan",
                apply: (wf) => {
                    wf.notes.push("Bên thuê là cá nhân → KHÔNG được thỏa thuận bên thuê kê khai thay. Chủ BĐS phải tự đăng ký MST cho thuê và tự kê khai.");
                },
            },
            {
                id: "nhieu_bds",
                condition: (ctx) => ctx.propertyCount === "nhieu",
                apply: (wf) => {
                    wf.requirements.find(r => r.id === "bang_ke_01bk").active = true;
                    wf.requirements.find(r => r.id === "bang_ke_01bk").required = true;
                    wf.notes.push("Nhiều BĐS cho thuê: kê khai bằng Mẫu 01/BĐS + Phụ lục Bảng kê 01/BK-BĐS (liệt kê chi tiết từng BĐS). MST đăng ký 1 lần dùng chung cho tất cả.");
                },
            },
            {
                id: "duoi_nguong",
                condition: (ctx) => ctx.revenueRange === "duoi_1ty",
                apply: (wf) => {
                    wf.fees.forEach(f => { f.active = false; });
                    wf.notes.push("Doanh thu ≤ 1 tỷ đồng/năm → KHÔNG phải nộp thuế GTGT và TNCN (NĐ 144/2026/NĐ-CP). Tuy nhiên vẫn PHẢI kê khai thuế theo quy định.");
                    wf.steps[2].active = false;
                },
            },
            {
                id: "tren_nguong",
                condition: (ctx) => ctx.revenueRange === "tren_1ty",
                apply: (wf) => {
                    wf.warnings.push("⚠️ Doanh thu > 1 tỷ đồng/năm → phải nộp thuế GTGT 5% + TNCN 5% = tổng 10% doanh thu cho thuê. Ngưỡng 1 tỷ tính cho TỔNG tất cả BĐS của cá nhân, theo năm dương lịch.");
                },
            },
        ],
    },
};

// ================================================================
// RULE ENGINE
// ================================================================
function resolveWorkflow(procedure, context) {
    const wf = {
        fees: structuredClone(procedure.baseFees),
        eligibility: structuredClone(procedure.baseEligibility),
        requirements: structuredClone(procedure.baseRequirements),
        steps: structuredClone(procedure.baseSteps),
        forms: [...procedure.baseForms],
        notes: [],
        warnings: [],
    };

    procedure.rules.forEach(rule => {
        if (rule.condition(context)) {
            rule.apply(wf, context);
        }
    });

    wf.fees = wf.fees.filter(f => f.active);
    wf.eligibility = wf.eligibility.filter(e => e.active);
    wf.requirements = wf.requirements.filter(r => r.active);
    wf.steps = wf.steps.filter(s => s.active);
    wf.steps.forEach((s, i) => { s.order = i + 1; });

    return wf;
}

function isIntakeComplete(procedure, context) {
    return procedure.intake.every(q => {
        if (q.showIf && !q.showIf(context)) return true;
        return context[q.id] !== undefined && context[q.id] !== "";
    });
}

// ================================================================
// DATA: FORMS
// ================================================================
const FORMS = {
    mau18: {
        id: "mau18",
        name: "Mẫu số 18",
        title: "Đơn đăng ký biến động đất đai, tài sản gắn liền với đất",
        icon: "📋",
        sections: [
            {
                title: "1. Người sử dụng đất, chủ sở hữu tài sản gắn liền với đất",
                questions: [
                    { id: "recipient", label: "Kính gửi", hint: "Văn phòng đăng ký đất đai nơi có bất động sản", type: "text", placeholder: "VD: Văn phòng đăng ký đất đai quận Thanh Xuân" },
                    { id: "fullName", label: "1.1. Tên (viết chữ in hoa)", type: "text", placeholder: "VD: NGUYỄN VĂN A", profileKey: "name" },
                    { id: "idType", label: "Loại giấy tờ nhân thân", type: "select", options: [{ value: "cmnd", text: "CMND" }, { value: "cccd", text: "Căn cước công dân" }, { value: "dinh_danh", text: "Định danh cá nhân" }, { value: "hochieu", text: "Hộ chiếu" }, { value: "gpkd", text: "Giấy phép kinh doanh" }], profileKey: "idType" },
                    { id: "idNumber", label: "1.2. Số giấy tờ nhân thân/pháp nhân", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "address", label: "1.3. Địa chỉ", type: "text", placeholder: "VD: Số 10, Lê Lợi, P. Bến Nghé, Q.1, TP.HCM", profileKey: "address" },
                    { id: "phone", label: "1.4. Điện thoại", type: "tel", placeholder: "VD: 0912345678", required: false, profileKey: "phone" },
                    { id: "email", label: "Email", type: "email", placeholder: "VD: email@example.com", required: false, profileKey: "email" },
                ],
            },
            {
                title: "2. Giấy chứng nhận đã cấp",
                questions: [
                    { id: "gcnSoVaoSo", label: "2.1. Số vào sổ cấp GCN", type: "text", placeholder: "VD: CH 01234" },
                    { id: "gcnSoPhatHanh", label: "2.2. Số phát hành (Số seri)", type: "text", placeholder: "VD: BĐ 567890" },
                    { id: "gcnNgayCap", label: "2.3. Ngày cấp GCN", type: "date" },
                ],
            },
            {
                title: "3. Nội dung biến động",
                questions: [
                    { id: "changeType", label: "Loại biến động", type: "select", options: [{ value: "chuyen_nhuong", text: "Nhận chuyển nhượng (mua)" }, { value: "tang_cho", text: "Nhận tặng cho" }, { value: "thua_ke", text: "Nhận thừa kế" }, { value: "khac", text: "Biến động khác" }] },
                    { id: "changeDetail", label: "3.1. Nội dung biến động", type: "textarea", placeholder: "Mô tả chi tiết nội dung biến động...", hint: "VD: Nhận chuyển nhượng QSDĐ từ ông/bà ... theo HĐ chuyển nhượng số ... ngày ..." },
                    { id: "changeReason", label: "3.2. Lý do biến động", type: "textarea", placeholder: "VD: Thực hiện hợp đồng chuyển nhượng quyền sử dụng đất", required: false },
                ],
            },
            {
                title: "4. Giấy tờ liên quan nộp kèm theo đơn này",
                questions: [
                    { id: "doc1", label: "Giấy tờ kèm theo 1", type: "text", placeholder: "VD: Hợp đồng chuyển nhượng QSDĐ có công chứng" },
                    { id: "doc2", label: "Giấy tờ kèm theo 2", type: "text", placeholder: "VD: Biên lai nộp thuế, lệ phí", required: false },
                    { id: "doc3", label: "Giấy tờ kèm theo 3", type: "text", placeholder: "VD: Bản sao CMND/CCCD", required: false },
                    { id: "doc4", label: "Giấy tờ kèm theo 4", type: "text", placeholder: "VD: Giấy chứng nhận quyền sử dụng đất", required: false },
                ],
            },
            {
                title: "Ký đơn",
                questions: [
                    { id: "signPlace", label: "Nơi ký đơn", type: "text", placeholder: "VD: Hà Nội", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký đơn", type: "date" },
                ],
            },
        ],
        render: renderMau18,
    },
    mau03bds_tncn: {
        id: "mau03bds_tncn",
        name: "Mẫu 03/BĐS-TNCN",
        title: "Tờ khai thuế thu nhập cá nhân (chuyển nhượng BĐS)",
        icon: "💰",
        sections: [
            {
                title: "I. Thông tin người chuyển nhượng (bên bán)",
                questions: [
                    { id: "taxPeriodDate", label: "[01] Kỳ tính thuế — ngày phát sinh", type: "date" },
                    { id: "isFirstTime", label: "[02]/[03] Lần đầu hay bổ sung?", type: "radio", options: [{ value: "first", text: "Lần đầu" }, { value: "supplement", text: "Bổ sung" }] },
                    { id: "supplementNumber", label: "Bổ sung lần thứ", type: "text", placeholder: "VD: 1", showIf: { field: "isFirstTime", value: "supplement" } },
                    { id: "taxpayerName", label: "[04] Họ và tên người nộp thuế", type: "text", placeholder: "VD: Nguyễn Văn A", profileKey: "name" },
                    { id: "taxCode", label: "[05] Mã số thuế (nếu có)", type: "text", placeholder: "VD: 0123456789", required: false, profileKey: "taxCode" },
                    { id: "idNumber", label: "[06] Số CMND/CCCD/Định danh cá nhân/Hộ chiếu", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "taxpayerAddress", label: "[07] Địa chỉ", type: "text", placeholder: "VD: Số 10, Lê Lợi, P. Bến Nghé", profileKey: "address" },
                    { id: "ward", label: "[08] Xã/phường/đặc khu", type: "text", placeholder: "VD: P. Bến Nghé" },
                    { id: "district", label: "[09] Quận/huyện", type: "text", placeholder: "VD: Quận 1", profileKey: "district" },
                    { id: "province", label: "[10] Tỉnh/Thành phố", type: "text", placeholder: "VD: TP. HCM", profileKey: "province" },
                    { id: "phone", label: "[11] Điện thoại", type: "tel", placeholder: "VD: 0912345678", required: false, profileKey: "phone" },
                    { id: "fax", label: "[12] Fax", type: "text", placeholder: "", required: false },
                    { id: "email", label: "[13] Email", type: "email", placeholder: "VD: email@example.com", required: false, profileKey: "email" },
                    { id: "agentName", label: "[14] Tên đại lý thuế / ủy quyền khai thay (nếu có)", type: "text", required: false },
                    { id: "agentTaxCode", label: "[15] MST đại lý thuế", type: "text", required: false },
                    { id: "agentContractNo", label: "[16] Hợp đồng đại lý thuế: Số", type: "text", required: false },
                    { id: "agentContractDate", label: "[16] Ngày hợp đồng đại lý thuế", type: "date", required: false },
                ],
            },
            {
                title: "II. Thông tin người nhận chuyển nhượng (bên mua)",
                questions: [
                    { id: "buyerName", label: "[17] Họ và tên người nhận", type: "text", placeholder: "VD: Trần Thị B", profileKey: "party2_name" },
                    { id: "buyerTaxCode", label: "[18] Mã số thuế (nếu có)", type: "text", required: false },
                    { id: "buyerIdNumber", label: "[19] Số CMND/CCCD/Định danh cá nhân/Hộ chiếu", type: "text", placeholder: "VD: 001234567890", profileKey: "party2_idNumber" },
                    { id: "buyerAddress", label: "[20] Địa chỉ", type: "text", placeholder: "VD: Số 5, Nguyễn Huệ, Q.1, TP.HCM", profileKey: "party2_address" },
                    { id: "buyerWard", label: "[21] Xã/phường/đặc khu", type: "text", required: false },
                    { id: "buyerDistrict", label: "[22] Quận/huyện", type: "text", required: false },
                    { id: "buyerProvince", label: "[23] Tỉnh/Thành phố", type: "text", required: false },
                    { id: "buyerPhone", label: "[24] Điện thoại", type: "tel", required: false, profileKey: "party2_phone" },
                    { id: "buyerEmail", label: "[25] Email", type: "email", required: false },
                    { id: "relationship", label: "[26] Mối quan hệ với người chuyển nhượng", type: "select", options: [{ value: "none", text: "Không có quan hệ" }, { value: "spouse", text: "Vợ/Chồng" }, { value: "parent_child", text: "Cha mẹ — Con" }, { value: "grandparent", text: "Ông bà — Cháu" }, { value: "in_law", text: "Cha mẹ chồng/vợ — Con dâu/rể" }, { value: "sibling", text: "Anh chị em ruột" }] },
                ],
            },
            {
                title: "III. Loại bất động sản chuyển nhượng",
                questions: [
                    { id: "propertyType", label: "Loại bất động sản", type: "select", options: [{ value: "dat_khong_nha", text: "[37] Đất không có nhà" }, { value: "nha_dat", text: "[38] Nhà đất" }, { value: "can_ho", text: "[39] Căn hộ chung cư" }, { value: "khac", text: "[40] Bất động sản khác" }] },
                    { id: "propertyTypeOther", label: "Ghi rõ loại BĐS khác", type: "text", required: false, showIf: { field: "propertyType", value: "khac" } },
                ],
            },
            {
                title: "IV. Thông tin bất động sản chuyển nhượng",
                questions: [
                    { id: "propertyAddress", label: "[41] Địa chỉ BĐS", type: "text", placeholder: "VD: Số 5, đường Nguyễn Huệ, P. Bến Nghé, Q.1, TP.HCM", profileKey: "prop_address" },
                    { id: "propertyWard", label: "[41.1] Xã/phường", type: "text" },
                    { id: "propertyDistrict", label: "[41.2] Quận/huyện", type: "text" },
                    { id: "propertyProvince", label: "[41.3] Tỉnh/Thành phố", type: "text" },
                    { id: "parcelNumber", label: "[41.4] Thửa đất số", type: "text", placeholder: "VD: 123", profileKey: "prop_parcelNumber" },
                    { id: "mapNumber", label: "[41.5] Tờ bản đồ số", type: "text", placeholder: "VD: 45", profileKey: "prop_mapNumber" },
                    { id: "gcnNumber", label: "[41.6] GCN QSD đất số", type: "text", placeholder: "VD: AB 123456", profileKey: "prop_gcnNumber" },
                    { id: "gcnDate", label: "Ngày cấp GCN", type: "date", profileKey: "prop_gcnDate" },
                    { id: "landType1", label: "[41.7] Loại đất 1", type: "text", placeholder: "VD: Đất ở (ONT)" },
                    { id: "landArea1", label: "Diện tích loại đất 1 (m²)", type: "text", placeholder: "VD: 120" },
                    { id: "landPosition1", label: "Vị trí loại đất 1", type: "text", placeholder: "VD: 1", required: false },
                    { id: "landType2", label: "Loại đất 2 (nếu có)", type: "text", required: false },
                    { id: "landArea2", label: "Diện tích loại đất 2 (m²)", type: "text", required: false },
                    { id: "landPosition2", label: "Vị trí loại đất 2", type: "text", required: false },
                    { id: "houseArea", label: "[42] Diện tích nhà (m²)", type: "text", placeholder: "VD: 80", required: false },
                    { id: "houseGrade", label: "[42] Cấp/Hạng nhà", type: "text", required: false },
                    { id: "houseFloors", label: "Số tầng nhà", type: "text", required: false },
                    { id: "buildYear", label: "Năm xây dựng", type: "text", required: false },
                ],
            },
            {
                title: "V. Giá chuyển nhượng và thuế TNCN",
                questions: [
                    { id: "transferType", label: "[43] Hình thức chuyển nhượng", type: "select", options: [{ value: "mua_ban", text: "Mua bán / Chuyển nhượng" }, { value: "tang_cho", text: "Tặng cho" }, { value: "thua_ke", text: "Thừa kế" }] },
                    { id: "contractValue", label: "[44] Giá chuyển nhượng trên hợp đồng (VNĐ)", type: "text", placeholder: "VD: 3000000000" },
                    { id: "landRefPrice", label: "[45] Giá đất theo bảng giá đất của UBND (VNĐ)", type: "text", placeholder: "", required: false },
                    { id: "houseRefPrice", label: "[46] Giá tính lệ phí trước bạ nhà (VNĐ)", type: "text", required: false },
                    { id: "taxableValue", label: "[47] Giá tính thuế (VNĐ)", type: "text", placeholder: "Lấy giá cao hơn: HĐ hoặc bảng giá UBND", hint: "= max([44], [45]+[46])" },
                    { id: "taxRate", label: "[48] Thuế suất (%)", type: "text", placeholder: "2" },
                    { id: "taxAmount", label: "[49] Số thuế TNCN phải nộp (VNĐ)", type: "text", placeholder: "= [47] × [48]%" },
                    { id: "exemptAmount", label: "[50] Số thuế được miễn/giảm (VNĐ)", type: "text", required: false, placeholder: "0" },
                    { id: "taxPayable", label: "[51] Số thuế còn phải nộp (VNĐ)", type: "text", placeholder: "= [49] – [50]" },
                ],
            },
            {
                title: "VI. Miễn/Giảm thuế",
                questions: [
                    { id: "isExempt", label: "Có thuộc diện miễn/giảm thuế?", type: "radio", options: [{ value: "no", text: "Không" }, { value: "yes", text: "Có — miễn thuế" }] },
                    { id: "exemptReason", label: "Lý do miễn/giảm", type: "textarea", placeholder: "VD: Tặng cho giữa cha mẹ và con theo Khoản 4 Điều 4 Luật Thuế TNCN", required: false, showIf: { field: "isExempt", value: "yes" } },
                    { id: "exemptLegalBasis", label: "Căn cứ pháp lý miễn/giảm", type: "text", placeholder: "VD: Khoản 4 Điều 4 Luật Thuế TNCN", required: false, showIf: { field: "isExempt", value: "yes" } },
                    { id: "exemptDocs", label: "Giấy tờ chứng minh miễn thuế", type: "text", placeholder: "VD: Giấy khai sinh, sổ hộ khẩu", required: false, showIf: { field: "isExempt", value: "yes" } },
                    { id: "coOwner1Name", label: "Đồng chủ sở hữu 1 — Tên", type: "text", required: false },
                    { id: "coOwner1TaxCode", label: "Đồng chủ sở hữu 1 — MST", type: "text", required: false },
                    { id: "coOwner1Id", label: "Đồng chủ sở hữu 1 — CMND/CCCD", type: "text", required: false },
                    { id: "coOwner1Ratio", label: "Đồng chủ sở hữu 1 — Tỷ lệ sở hữu (%)", type: "text", required: false },
                    { id: "coOwner2Name", label: "Đồng chủ sở hữu 2 — Tên", type: "text", required: false },
                    { id: "coOwner2TaxCode", label: "Đồng chủ sở hữu 2 — MST", type: "text", required: false },
                    { id: "coOwner2Id", label: "Đồng chủ sở hữu 2 — CMND/CCCD", type: "text", required: false },
                    { id: "coOwner2Ratio", label: "Đồng chủ sở hữu 2 — Tỷ lệ sở hữu (%)", type: "text", required: false },
                ],
            },
            {
                title: "VII. Ký tờ khai",
                questions: [
                    { id: "signProvince", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau03BDS,
    },
    mau01lptb: {
        id: "mau01lptb",
        name: "Mẫu 01/LPTB",
        title: "Tờ khai lệ phí trước bạ (nhà, đất)",
        icon: "🏠",
        sections: [
            {
                title: "Thông tin người nộp thuế",
                questions: [
                    { id: "taxPeriodDate", label: "[01] Ngày phát sinh lệ phí trước bạ", type: "date" },
                    { id: "isFirstTime", label: "[02]/[03] Lần đầu hay bổ sung?", type: "radio", options: [{ value: "first", text: "Lần đầu" }, { value: "supplement", text: "Bổ sung" }] },
                    { id: "supplementNumber", label: "Bổ sung lần thứ", type: "text", placeholder: "VD: 1", showIf: { field: "isFirstTime", value: "supplement" } },
                    { id: "taxpayerName", label: "[04] Người nộp thuế", type: "text", placeholder: "VD: Nguyễn Văn A", profileKey: "name" },
                    { id: "taxCode", label: "[05] Mã số thuế (nếu có)", type: "text", placeholder: "VD: 0123456789", required: false, profileKey: "taxCode" },
                    { id: "idNumber", label: "[06] Số CMND/CCCD/Định danh cá nhân/Hộ chiếu", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "taxpayerAddress", label: "[07] Địa chỉ", type: "text", placeholder: "VD: Số 10, Lê Lợi, P. Bến Nghé", profileKey: "address" },
                    { id: "ward", label: "[08] Xã/phường/đặc khu", type: "text", placeholder: "VD: P. Bến Nghé" },
                    { id: "district", label: "[09] Quận/huyện", type: "text", placeholder: "VD: Quận 1", profileKey: "district" },
                    { id: "province", label: "[10] Tỉnh/Thành phố", type: "text", placeholder: "VD: TP. HCM", profileKey: "province" },
                    { id: "taxpayerPhone", label: "[11] Điện thoại", type: "tel", placeholder: "VD: 0912345678", required: false, profileKey: "phone" },
                    { id: "taxpayerEmail", label: "[12] Email", type: "email", placeholder: "VD: email@example.com", required: false, profileKey: "email" },
                ],
            },
            {
                title: "[13] Đại lý thuế; hoặc Tổ chức, cá nhân được ủy quyền khai thay (nếu có)",
                questions: [
                    { id: "hasAgent", label: "Có đại lý thuế / ủy quyền khai thay?", type: "radio", options: [{ value: "no", text: "Không" }, { value: "dai_ly", text: "Đại lý thuế" }, { value: "uy_quyen", text: "Tổ chức, cá nhân được ủy quyền khai thay" }] },
                    { id: "agentName", label: "Tên đại lý / người được ủy quyền", type: "text", showIf: { field: "hasAgent", value: "dai_ly" } },
                    { id: "agentTaxCode", label: "Mã số thuế", type: "text", showIf: { field: "hasAgent", value: "dai_ly" } },
                    { id: "agentContractNumber", label: "Hợp đồng đại lý thuế: Số", type: "text", showIf: { field: "hasAgent", value: "dai_ly" } },
                    { id: "agentContractDate", label: "Ngày hợp đồng đại lý thuế", type: "date", showIf: { field: "hasAgent", value: "dai_ly" } },
                    { id: "proxyName", label: "Tên tổ chức/cá nhân ủy quyền", type: "text", showIf: { field: "hasAgent", value: "uy_quyen" } },
                    { id: "proxyTaxCode", label: "Mã số thuế", type: "text", showIf: { field: "hasAgent", value: "uy_quyen" } },
                    { id: "proxyDocNumber", label: "Văn bản ủy quyền: Số", type: "text", showIf: { field: "hasAgent", value: "uy_quyen" } },
                    { id: "proxyDocDate", label: "Ngày văn bản ủy quyền", type: "date", showIf: { field: "hasAgent", value: "uy_quyen" } },
                ],
            },
            {
                title: "1. Đặc điểm đất",
                questions: [
                    { id: "parcelNumber", label: "1.1. Thửa đất số", type: "text", placeholder: "VD: 123", profileKey: "prop_parcelNumber" },
                    { id: "mapNumber", label: "Tờ bản đồ số", type: "text", placeholder: "VD: 45", profileKey: "prop_mapNumber" },
                    { id: "houseNumber", label: "1.2. Số nhà", type: "text", required: false },
                    { id: "building", label: "Tòa nhà", type: "text", required: false },
                    { id: "alley", label: "Ngõ/Hẻm", type: "text", required: false },
                    { id: "street", label: "Đường/Phố", type: "text", placeholder: "VD: Lê Lợi" },
                    { id: "village", label: "Thôn/xóm/ấp", type: "text", required: false },
                    { id: "landWard", label: "Phường/xã", type: "text", placeholder: "VD: P. Bến Nghé" },
                    { id: "landDistrict", label: "Quận/huyện", type: "text", placeholder: "VD: Quận 1" },
                    { id: "landProvince", label: "Tỉnh/TP", type: "text", placeholder: "VD: TP. HCM" },
                    { id: "landPosition", label: "1.3. Vị trí thửa đất", type: "select", options: [{ value: "mat_tien", text: "Mặt tiền đường phố" }, { value: "ngo", text: "Ngõ / Hẻm" }, { value: "khac", text: "Khác" }] },
                    { id: "landPurpose", label: "1.4. Mục đích sử dụng đất", type: "text", placeholder: "VD: Đất ở tại đô thị" },
                    { id: "landArea", label: "1.5. Diện tích (m²)", type: "text", placeholder: "VD: 120", profileKey: "prop_landArea" },
                ],
            },
            {
                title: "1.6. Nguồn gốc nhà đất",
                questions: [
                    { id: "landOrigin", label: "Nguồn gốc nhà đất", type: "select", options: [{ value: "nha_nuoc_giao", text: "Nhà nước giao" }, { value: "nha_nuoc_thue", text: "Nhà nước cho thuê" }, { value: "chuyen_nhuong", text: "Nhận chuyển nhượng" }, { value: "thua_ke", text: "Nhận thừa kế" }, { value: "tang_cho", text: "Nhận tặng cho" }] },
                    { id: "transferorName", label: "Tên người chuyển giao", type: "text", placeholder: "VD: Nguyễn Văn B" },
                    { id: "transferorTaxCode", label: "MST người chuyển giao", type: "text", required: false },
                    { id: "transferorId", label: "Số CMND/CCCD người chuyển giao", type: "text", required: false },
                    { id: "transferorAddress", label: "Địa chỉ người chuyển giao", type: "text" },
                    { id: "transferDate", label: "Thời điểm chuyển giao QSDĐ", type: "date" },
                    { id: "landTransferValue", label: "1.7. Giá trị đất chuyển giao (VNĐ)", type: "text", required: false },
                ],
            },
            {
                title: "2. Thông tin nhà",
                questions: [
                    { id: "houseGrade", label: "2.1. Cấp nhà / Hạng", type: "text", required: false },
                    { id: "houseType", label: "Loại nhà", type: "text", required: false },
                    { id: "isChungCu", label: "Là chung cư?", type: "radio", options: [{ value: "no", text: "Không" }, { value: "yes", text: "Có — chung cư" }], required: false },
                    { id: "chungCuDeveloper", label: "Chủ dự án chung cư", type: "text", required: false, showIf: { field: "isChungCu", value: "yes" } },
                    { id: "chungCuStructure", label: "Kết cấu", type: "text", required: false, showIf: { field: "isChungCu", value: "yes" } },
                    { id: "chungCuFloors", label: "Số tầng tòa nhà", type: "text", required: false, showIf: { field: "isChungCu", value: "yes" } },
                    { id: "chungCuSharedArea", label: "DT sở hữu chung (m²)", type: "text", required: false, showIf: { field: "isChungCu", value: "yes" } },
                    { id: "chungCuPrivateArea", label: "DT sở hữu riêng (m²)", type: "text", required: false, showIf: { field: "isChungCu", value: "yes" } },
                    { id: "constructionArea", label: "DT xây dựng (m²)", type: "text", required: false },
                    { id: "floorArea", label: "DT sàn (m²)", type: "text", required: false },
                    { id: "houseOriginType", label: "Nguồn gốc nhà", type: "radio", options: [{ value: "tu_xay", text: "Tự xây dựng" }, { value: "mua_thua_ke_tang", text: "Mua / Thừa kế / Tặng cho" }], required: false },
                    { id: "houseValue", label: "Giá trị nhà (VNĐ)", type: "text", required: false },
                ],
            },
            {
                title: "3. Giá trị & Hình thức nhận",
                questions: [
                    { id: "totalTransferType", label: "Hình thức nhận", type: "select", options: [{ value: "chuyen_nhuong", text: "Nhận chuyển nhượng" }, { value: "thua_ke", text: "Nhận thừa kế" }, { value: "tang_cho", text: "Nhận tặng cho" }] },
                    { id: "totalTransferValue", label: "Giá trị nhà đất thực tế (VNĐ)", type: "text", required: false },
                ],
            },
            {
                title: "4. Miễn LPTB & Giấy tờ kèm",
                questions: [
                    { id: "exemptionReason", label: "Lý do miễn lệ phí trước bạ (nếu có)", type: "textarea", required: false },
                    { id: "relatedDocs", label: "Giấy tờ nộp kèm", type: "textarea", required: false },
                ],
            },
            {
                title: "5. Thông tin đồng chủ sở hữu nhà, đất",
                questions: [
                    { id: "hasCoOwner", label: "Có đồng chủ sở hữu?", type: "radio", options: [{ value: "no", text: "Không" }, { value: "yes", text: "Có" }] },
                    { id: "coOwner1Name", label: "Đồng chủ sở hữu 1 — Tên", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner1TaxCode", label: "Đồng chủ sở hữu 1 — MST", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner1Id", label: "Đồng chủ sở hữu 1 — CMND/CCCD", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner1Ratio", label: "Đồng chủ sở hữu 1 — Tỷ lệ sở hữu (%)", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner2Name", label: "Đồng chủ sở hữu 2 — Tên", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner2TaxCode", label: "Đồng chủ sở hữu 2 — MST", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner2Id", label: "Đồng chủ sở hữu 2 — CMND/CCCD", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner2Ratio", label: "Đồng chủ sở hữu 2 — Tỷ lệ sở hữu (%)", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner3Name", label: "Đồng chủ sở hữu 3 — Tên", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner3TaxCode", label: "Đồng chủ sở hữu 3 — MST", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner3Id", label: "Đồng chủ sở hữu 3 — CMND/CCCD", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                    { id: "coOwner3Ratio", label: "Đồng chủ sở hữu 3 — Tỷ lệ sở hữu (%)", type: "text", required: false, showIf: { field: "hasCoOwner", value: "yes" } },
                ],
            },
            {
                title: "Ký tờ khai",
                questions: [
                    { id: "signProvince", label: "Nơi ký tờ khai", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau01LPTB,
    },
    hop_dong_dat_coc: {
        id: "hop_dong_dat_coc",
        name: "Hợp đồng đặt cọc",
        title: "Hợp đồng đặt cọc mua bán bất động sản",
        icon: "📝",
        sections: [
            {
                title: "Bên đặt cọc (Bên mua)",
                questions: [
                    { id: "buyerName", label: "Họ và tên bên mua", type: "text", placeholder: "VD: Nguyễn Văn A", profileKey: "name" },
                    { id: "buyerBirthYear", label: "Năm sinh", type: "text", placeholder: "VD: 1990", profileKey: "birthYear" },
                    { id: "buyerIdNumber", label: "Số CMND/CCCD", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "buyerIdDate", label: "Ngày cấp CMND/CCCD", type: "date", profileKey: "idIssuedDate" },
                    { id: "buyerIdPlace", label: "Nơi cấp", type: "text", placeholder: "VD: Cục CSQLHC về TTXH", profileKey: "idIssuedPlace" },
                    { id: "buyerAddress", label: "Địa chỉ thường trú", type: "text", profileKey: "address" },
                    { id: "buyerPhone", label: "Điện thoại", type: "tel", profileKey: "phone" },
                ],
            },
            {
                title: "Bên nhận đặt cọc (Bên bán)",
                questions: [
                    { id: "sellerName", label: "Họ và tên bên bán", type: "text", placeholder: "VD: Trần Thị B", profileKey: "party2_name" },
                    { id: "sellerBirthYear", label: "Năm sinh", type: "text", profileKey: "party2_birthYear" },
                    { id: "sellerIdNumber", label: "Số CMND/CCCD", type: "text", profileKey: "party2_idNumber" },
                    { id: "sellerIdDate", label: "Ngày cấp CMND/CCCD", type: "date", profileKey: "party2_idDate" },
                    { id: "sellerIdPlace", label: "Nơi cấp", type: "text", profileKey: "party2_idPlace" },
                    { id: "sellerAddress", label: "Địa chỉ thường trú", type: "text", profileKey: "party2_address" },
                    { id: "sellerPhone", label: "Điện thoại", type: "tel", profileKey: "party2_phone" },
                ],
            },
            {
                title: "Thông tin bất động sản",
                questions: [
                    { id: "propertyAddress", label: "Địa chỉ BĐS", type: "text", placeholder: "VD: Số 5, Nguyễn Huệ, Q.1, TP.HCM", profileKey: "prop_address" },
                    { id: "parcelNumber", label: "Thửa đất số", type: "text", profileKey: "prop_parcelNumber" },
                    { id: "mapNumber", label: "Tờ bản đồ số", type: "text", profileKey: "prop_mapNumber" },
                    { id: "landArea", label: "Diện tích đất (m²)", type: "text", profileKey: "prop_landArea" },
                    { id: "gcnNumber", label: "GCN số", type: "text", profileKey: "prop_gcnNumber" },
                    { id: "gcnDate", label: "Ngày cấp GCN", type: "date", profileKey: "prop_gcnDate" },
                    { id: "landPurpose", label: "Mục đích sử dụng", type: "text", placeholder: "VD: Đất ở tại đô thị" },
                ],
            },
            {
                title: "Nội dung đặt cọc",
                questions: [
                    { id: "totalPrice", label: "Giá bán thỏa thuận (VNĐ)", type: "text", placeholder: "VD: 3000000000" },
                    { id: "depositAmount", label: "Số tiền đặt cọc (VNĐ)", type: "text", placeholder: "VD: 300000000" },
                    { id: "depositDate", label: "Ngày giao tiền đặt cọc", type: "date" },
                    { id: "depositMethod", label: "Hình thức đặt cọc", type: "radio", options: [{ value: "tien_mat", text: "Tiền mặt" }, { value: "chuyen_khoan", text: "Chuyển khoản" }] },
                    { id: "bankAccount", label: "Số tài khoản nhận (nếu chuyển khoản)", type: "text", required: false, showIf: { field: "depositMethod", value: "chuyen_khoan" } },
                    { id: "bankName", label: "Ngân hàng", type: "text", required: false, showIf: { field: "depositMethod", value: "chuyen_khoan" } },
                    { id: "notaryDeadline", label: "Thời hạn công chứng HĐ chuyển nhượng (ngày)", type: "text", placeholder: "VD: 30", hint: "Số ngày kể từ ngày ký HĐ đặt cọc" },
                    { id: "penaltyTerms", label: "Điều khoản phạt vi phạm", type: "textarea", placeholder: "VD: Bên nào vi phạm mất cọc / phải trả gấp đôi tiền cọc", required: false },
                ],
            },
            {
                title: "Ký hợp đồng",
                questions: [
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderHopDongDatCoc,
    },
    giay_uy_quyen: {
        id: "giay_uy_quyen",
        name: "Giấy ủy quyền",
        title: "Giấy ủy quyền giao dịch bất động sản",
        icon: "🤝",
        sections: [
            {
                title: "Bên ủy quyền",
                questions: [
                    { id: "granterName", label: "Họ và tên bên ủy quyền", type: "text", profileKey: "name" },
                    { id: "granterBirthYear", label: "Năm sinh", type: "text", profileKey: "birthYear" },
                    { id: "granterIdNumber", label: "Số CMND/CCCD", type: "text", profileKey: "idNumber" },
                    { id: "granterIdDate", label: "Ngày cấp", type: "date", profileKey: "idIssuedDate" },
                    { id: "granterIdPlace", label: "Nơi cấp", type: "text", profileKey: "idIssuedPlace" },
                    { id: "granterAddress", label: "Địa chỉ thường trú", type: "text", profileKey: "address" },
                    { id: "granterPhone", label: "Điện thoại", type: "tel", profileKey: "phone" },
                ],
            },
            {
                title: "Bên được ủy quyền",
                questions: [
                    { id: "granteeName", label: "Họ và tên bên được ủy quyền", type: "text", profileKey: "party2_name" },
                    { id: "granteeBirthYear", label: "Năm sinh", type: "text", profileKey: "party2_birthYear" },
                    { id: "granteeIdNumber", label: "Số CMND/CCCD", type: "text", profileKey: "party2_idNumber" },
                    { id: "granteeIdDate", label: "Ngày cấp", type: "date", profileKey: "party2_idDate" },
                    { id: "granteeIdPlace", label: "Nơi cấp", type: "text", profileKey: "party2_idPlace" },
                    { id: "granteeAddress", label: "Địa chỉ thường trú", type: "text", profileKey: "party2_address" },
                    { id: "granteePhone", label: "Điện thoại", type: "tel", profileKey: "party2_phone" },
                    { id: "relationship", label: "Mối quan hệ với bên ủy quyền", type: "text", placeholder: "VD: Con trai, vợ/chồng, luật sư..." },
                ],
            },
            {
                title: "Nội dung ủy quyền",
                questions: [
                    { id: "authScope", label: "Phạm vi ủy quyền", type: "select", options: [
                        { value: "ban", text: "Ủy quyền bán / chuyển nhượng BĐS" },
                        { value: "mua", text: "Ủy quyền mua / nhận chuyển nhượng" },
                        { value: "thu_tuc", text: "Ủy quyền làm thủ tục hành chính (đăng ký biến động, nộp thuế...)" },
                        { value: "toan_phan", text: "Ủy quyền toàn phần (bán + thủ tục + nhận tiền)" },
                    ]},
                    { id: "propertyAddress", label: "Địa chỉ BĐS liên quan", type: "text", profileKey: "prop_address" },
                    { id: "gcnNumber", label: "GCN số", type: "text", profileKey: "prop_gcnNumber" },
                    { id: "authDetail", label: "Chi tiết quyền hạn được ủy quyền", type: "textarea", placeholder: "Liệt kê cụ thể các việc được ủy quyền thực hiện..." },
                    { id: "authDuration", label: "Thời hạn ủy quyền", type: "text", placeholder: "VD: 6 tháng kể từ ngày ký" },
                    { id: "canDelegate", label: "Được ủy quyền lại cho người khác?", type: "radio", options: [{ value: "no", text: "Không" }, { value: "yes", text: "Có" }] },
                ],
            },
            {
                title: "Ký giấy ủy quyền",
                questions: [
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderGiayUyQuyen,
    },
    mau03a_xoa_dk: {
        id: "mau03a_xoa_dk",
        name: "Mẫu số 03a",
        title: "Phiếu yêu cầu xóa đăng ký biện pháp bảo đảm bằng QSDĐ, tài sản gắn liền với đất",
        icon: "🔓",
        sections: [
            {
                title: "Người yêu cầu xóa đăng ký",
                questions: [
                    { id: "requesterRole", label: "Tư cách người yêu cầu", type: "select", options: [
                        { value: "ben_nhan_bao_dam", text: "Bên nhận bảo đảm" },
                        { value: "ben_bao_dam", text: "Bên bảo đảm" },
                        { value: "ben_mua_tai_san", text: "Bên mua tài sản bảo đảm" },
                        { value: "ke_thua_quyen", text: "Người kế thừa quyền" },
                        { value: "co_quan_thi_hanh", text: "Cơ quan thi hành án" },
                        { value: "nguoi_uy_quyen", text: "Người được ủy quyền" },
                        { value: "khac", text: "Tổ chức/cá nhân khác" },
                    ]},
                    { id: "requesterName", label: "Họ và tên (viết IN HOA)", type: "text", placeholder: "VD: NGUYỄN VĂN A", profileKey: "name" },
                    { id: "requesterAddress", label: "Địa chỉ liên hệ", type: "text", placeholder: "VD: Số 10, Lê Lợi, Q.1, TP.HCM", profileKey: "address" },
                    { id: "requesterPhone", label: "Điện thoại", type: "tel", profileKey: "phone" },
                    { id: "requesterFax", label: "Fax", type: "text", required: false },
                    { id: "requesterEmail", label: "Email", type: "email", required: false, profileKey: "email" },
                ],
            },
            {
                title: "Yêu cầu xóa đăng ký biện pháp bảo đảm",
                questions: [
                    { id: "registrationNumber", label: "Số đăng ký biện pháp bảo đảm", type: "text", placeholder: "VD: 001/2024/ĐKBBĐ" },
                    { id: "registrationDate", label: "Ngày đăng ký", type: "date" },
                    { id: "registrationOrg", label: "Cơ quan đã đăng ký", type: "text", placeholder: "VD: Văn phòng đăng ký đất đai quận Thanh Xuân" },
                    { id: "deleteReason", label: "Căn cứ xóa đăng ký", type: "textarea", placeholder: "VD: Nghĩa vụ bảo đảm đã chấm dứt do bên bảo đảm đã thực hiện xong nghĩa vụ trả nợ" },
                    { id: "feeExempt", label: "Miễn phí đăng ký?", type: "radio", options: [{ value: "yes", text: "Có — thuộc diện miễn phí" }, { value: "no", text: "Không" }] },
                ],
            },
            {
                title: "Giấy tờ kèm theo",
                questions: [
                    { id: "attachDoc1", label: "Giấy tờ kèm theo 1", type: "text", placeholder: "VD: Hợp đồng thế chấp (bản gốc)" },
                    { id: "attachDoc2", label: "Giấy tờ kèm theo 2", type: "text", placeholder: "VD: Văn bản đồng ý giải chấp của ngân hàng", required: false },
                    { id: "attachDoc3", label: "Giấy tờ kèm theo 3", type: "text", placeholder: "VD: GCN QSDĐ bản gốc", required: false },
                ],
            },
            {
                title: "Cách thức nhận kết quả",
                questions: [
                    { id: "resultMethod", label: "Cách nhận kết quả", type: "select", options: [
                        { value: "truc_tiep", text: "Trực tiếp tại cơ quan đăng ký" },
                        { value: "buu_dien", text: "Qua đường bưu điện" },
                        { value: "fax_email", text: "Fax / Email" },
                        { value: "phuong_thuc_khac", text: "Phương thức khác" },
                    ]},
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau03aXoaDK,
    },
    mau01a_dk_bao_dam: {
        id: "mau01a_dk_bao_dam",
        name: "Mẫu số 01a",
        title: "Phiếu yêu cầu đăng ký thế chấp bằng QSDĐ, tài sản gắn liền với đất",
        icon: "🏦",
        sections: [
            {
                title: "Người yêu cầu đăng ký",
                questions: [
                    { id: "registrationOrg", label: "Kính gửi", type: "text", placeholder: "VD: Văn phòng đăng ký đất đai quận Thanh Xuân", hint: "Cơ quan đăng ký biện pháp bảo đảm" },
                    { id: "requesterRole", label: "Tư cách người yêu cầu", type: "select", options: [
                        { value: "ben_nhan_bao_dam", text: "Bên nhận bảo đảm (ngân hàng)" },
                        { value: "ben_bao_dam", text: "Bên bảo đảm (người vay)" },
                        { value: "nguoi_uy_quyen", text: "Người được ủy quyền" },
                    ]},
                    { id: "requesterName", label: "Họ và tên / Tên tổ chức (viết IN HOA)", type: "text", placeholder: "VD: NGÂN HÀNG TMCP NGOẠI THƯƠNG VIỆT NAM" },
                    { id: "requesterAddress", label: "Địa chỉ liên hệ", type: "text", placeholder: "VD: 198 Trần Quang Khải, Q. Hoàn Kiếm, Hà Nội" },
                    { id: "requesterPhone", label: "Điện thoại", type: "tel" },
                    { id: "requesterFax", label: "Fax", type: "text", required: false },
                    { id: "requesterEmail", label: "Email", type: "email", required: false },
                ],
            },
            {
                title: "Bên bảo đảm (người vay / chủ tài sản)",
                questions: [
                    { id: "guarantorName", label: "Họ và tên (viết IN HOA)", type: "text", placeholder: "VD: NGUYỄN VĂN A", profileKey: "name" },
                    { id: "guarantorIdNumber", label: "Số CMND/CCCD", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "guarantorAddress", label: "Địa chỉ", type: "text", profileKey: "address" },
                    { id: "guarantorPhone", label: "Điện thoại", type: "tel", required: false, profileKey: "phone" },
                ],
            },
            {
                title: "Bên nhận bảo đảm (ngân hàng / tổ chức tín dụng)",
                questions: [
                    { id: "lenderName", label: "Tên ngân hàng / tổ chức tín dụng", type: "text", placeholder: "VD: Ngân hàng TMCP Ngoại thương Việt Nam — Chi nhánh Đống Đa" },
                    { id: "lenderTaxCode", label: "Mã số thuế / Số ĐKKD", type: "text" },
                    { id: "lenderAddress", label: "Địa chỉ trụ sở", type: "text" },
                    { id: "lenderRepName", label: "Người đại diện", type: "text" },
                    { id: "lenderRepTitle", label: "Chức vụ", type: "text", placeholder: "VD: Giám đốc chi nhánh" },
                ],
            },
            {
                title: "Mô tả tài sản bảo đảm (bất động sản thế chấp)",
                questions: [
                    { id: "propertyAddress", label: "Địa chỉ BĐS", type: "text", placeholder: "VD: Số 5, Nguyễn Huệ, Q.1, TP.HCM", profileKey: "prop_address" },
                    { id: "parcelNumber", label: "Thửa đất số", type: "text", profileKey: "prop_parcelNumber" },
                    { id: "mapNumber", label: "Tờ bản đồ số", type: "text", profileKey: "prop_mapNumber" },
                    { id: "landArea", label: "Diện tích (m²)", type: "text", profileKey: "prop_landArea" },
                    { id: "landPurpose", label: "Mục đích sử dụng", type: "text", placeholder: "VD: Đất ở tại đô thị" },
                    { id: "gcnNumber", label: "GCN QSDĐ số", type: "text", profileKey: "prop_gcnNumber" },
                    { id: "gcnDate", label: "Ngày cấp GCN", type: "date", profileKey: "prop_gcnDate" },
                    { id: "hasHouse", label: "Tài sản gắn liền trên đất", type: "text", placeholder: "VD: Nhà ở, diện tích sàn 80m², 3 tầng", required: false },
                ],
            },
            {
                title: "Nội dung đăng ký biện pháp bảo đảm",
                questions: [
                    { id: "guaranteeType", label: "Biện pháp bảo đảm", type: "select", options: [
                        { value: "the_chap", text: "Thế chấp quyền sử dụng đất + tài sản gắn liền" },
                        { value: "the_chap_dat", text: "Thế chấp quyền sử dụng đất (không có tài sản)" },
                        { value: "the_chap_tai_san", text: "Thế chấp tài sản gắn liền với đất" },
                    ]},
                    { id: "contractNumber", label: "Hợp đồng thế chấp số", type: "text", placeholder: "VD: 01/2025/HĐTC" },
                    { id: "contractDate", label: "Ngày ký hợp đồng thế chấp", type: "date" },
                    { id: "notaryOrg", label: "Đã công chứng tại", type: "text", placeholder: "VD: Văn phòng Công chứng số 1, TP.HCM" },
                    { id: "notaryNumber", label: "Số công chứng", type: "text" },
                    { id: "obligation", label: "Nghĩa vụ được bảo đảm", type: "textarea", placeholder: "VD: Bảo đảm cho khoản vay theo HĐ tín dụng số ... ngày ... giữa bên vay và ngân hàng" },
                    { id: "guaranteeTerm", label: "Thời hạn bảo đảm", type: "text", placeholder: "VD: Đến khi thanh toán hết nợ gốc + lãi" },
                ],
            },
            {
                title: "Giấy tờ kèm theo",
                questions: [
                    { id: "attachDoc1", label: "Giấy tờ kèm theo 1", type: "text", placeholder: "VD: Hợp đồng thế chấp có công chứng (bản gốc)" },
                    { id: "attachDoc2", label: "Giấy tờ kèm theo 2", type: "text", placeholder: "VD: GCN QSDĐ bản gốc", required: false },
                    { id: "attachDoc3", label: "Giấy tờ kèm theo 3", type: "text", placeholder: "VD: Hợp đồng tín dụng", required: false },
                ],
            },
            {
                title: "Cách thức nhận kết quả & Ký",
                questions: [
                    { id: "resultMethod", label: "Cách nhận kết quả", type: "select", options: [
                        { value: "truc_tiep", text: "Trực tiếp tại cơ quan đăng ký" },
                        { value: "buu_dien", text: "Qua đường bưu điện" },
                        { value: "fax_email", text: "Fax / Email" },
                        { value: "phuong_thuc_khac", text: "Phương thức khác" },
                    ]},
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau01aDKBaoDam,
    },
    mau21: {
        id: "mau21",
        name: "Mẫu số 21",
        title: "Đơn đề nghị tách thửa đất, hợp thửa đất",
        icon: "📐",
        sections: [
            {
                title: "I. Người sử dụng đất",
                questions: [
                    { id: "recipient", label: "Kính gửi", hint: "Cơ quan tiếp nhận hồ sơ", type: "text", placeholder: "VD: Văn phòng đăng ký đất đai quận Bình Thạnh" },
                    { id: "fullName", label: "1.1. Tên (viết chữ in hoa)", type: "text", placeholder: "VD: NGUYỄN VĂN A", profileKey: "name" },
                    { id: "idType", label: "Loại giấy tờ nhân thân", type: "select", options: [{ value: "cmnd", text: "CMND" }, { value: "cccd", text: "CCCD" }, { value: "dinh_danh", text: "Định danh cá nhân" }, { value: "hochieu", text: "Hộ chiếu" }, { value: "gpkd", text: "GPKD" }], profileKey: "idType" },
                    { id: "idNumber", label: "1.2. Số giấy tờ nhân thân", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "address", label: "1.3. Địa chỉ", type: "text", profileKey: "address" },
                    { id: "phone", label: "1.4. Điện thoại", type: "tel", required: false, profileKey: "phone" },
                    { id: "email", label: "Email", type: "email", required: false, profileKey: "email" },
                ],
            },
            {
                title: "II. Nội dung tách / hợp thửa",
                questions: [
                    { id: "requestType", label: "Loại yêu cầu", type: "select", options: [
                        { value: "tach", text: "2.1. Tách thửa đất" },
                        { value: "hop", text: "2.2. Hợp thửa đất" },
                        { value: "tach_hop", text: "2.3. Tách thửa + hợp thửa đồng thời" },
                    ]},
                    { id: "parcelNumber", label: "Thửa đất số", type: "text", placeholder: "VD: 100", profileKey: "prop_parcelNumber" },
                    { id: "mapNumber", label: "Tờ bản đồ số", type: "text", placeholder: "VD: 15", profileKey: "prop_mapNumber" },
                    { id: "landArea", label: "Diện tích (m²)", type: "text", placeholder: "VD: 200", profileKey: "prop_landArea" },
                    { id: "landUse", label: "Loại đất / mục đích sử dụng", type: "text", placeholder: "VD: Đất ở (ONT)" },
                    { id: "gcnNumber", label: "Số GCN đã cấp", type: "text", placeholder: "VD: CH 01234", profileKey: "prop_gcnNumber" },
                    { id: "splitCount", label: "Tách thành bao nhiêu thửa mới?", type: "text", placeholder: "VD: 2" },
                    { id: "splitDetail", label: "Chi tiết diện tích từng thửa mới", type: "textarea", placeholder: "VD: Thửa 1: 100m² (đất ở), Thửa 2: 100m² (đất ở)" },
                    { id: "splitReason", label: "Lý do tách/hợp thửa", type: "textarea", placeholder: "VD: Chia đất cho con theo thỏa thuận gia đình" },
                ],
            },
            {
                title: "III. Giấy tờ nộp kèm & Đề nghị",
                questions: [
                    { id: "attachDoc1", label: "Giấy tờ kèm theo 1", type: "text", placeholder: "VD: GCN QSDĐ bản gốc" },
                    { id: "attachDoc2", label: "Giấy tờ kèm theo 2", type: "text", placeholder: "VD: Sơ đồ tách thửa (nếu có)", required: false },
                    { id: "attachDoc3", label: "Giấy tờ kèm theo 3", type: "text", placeholder: "VD: CMND/CCCD các bên liên quan", required: false },
                    { id: "requestGCN", label: "Đề nghị cấp GCN mới cho thửa đất?", type: "radio", options: [{ value: "yes", text: "Có" }, { value: "no", text: "Không" }] },
                ],
            },
            {
                title: "Ký đơn",
                questions: [
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau21,
    },
    mau04_nd151: {
        id: "mau04_nd151",
        name: "Mẫu số 04",
        title: "Đơn đăng ký đất đai, tài sản gắn liền với đất (lần đầu)",
        icon: "📕",
        sections: [
            {
                title: "1. Người sử dụng đất / chủ sở hữu tài sản",
                questions: [
                    { id: "recipient", label: "Kính gửi", hint: "Cơ quan đăng ký đất đai", type: "text", placeholder: "VD: Văn phòng đăng ký đất đai quận Gò Vấp" },
                    { id: "fullName", label: "1.1. Tên (viết chữ in hoa)", type: "text", placeholder: "VD: NGUYỄN VĂN A", profileKey: "name" },
                    { id: "idType", label: "Loại giấy tờ nhân thân", type: "select", options: [{ value: "cmnd", text: "CMND" }, { value: "cccd", text: "CCCD" }, { value: "dinh_danh", text: "Định danh cá nhân" }, { value: "hochieu", text: "Hộ chiếu" }, { value: "gpkd", text: "GPKD" }], profileKey: "idType" },
                    { id: "idNumber", label: "1.2. Số giấy tờ nhân thân", type: "text", placeholder: "VD: 001234567890", profileKey: "idNumber" },
                    { id: "address", label: "1.3. Địa chỉ", type: "text", profileKey: "address" },
                    { id: "phone", label: "1.4. Điện thoại", type: "tel", required: false, profileKey: "phone" },
                    { id: "email", label: "Email", type: "email", required: false, profileKey: "email" },
                ],
            },
            {
                title: "2. Thửa đất đăng ký",
                questions: [
                    { id: "parcelNumber", label: "2.1. Thửa đất số", type: "text", profileKey: "prop_parcelNumber" },
                    { id: "mapNumber", label: "Tờ bản đồ số", type: "text", profileKey: "prop_mapNumber" },
                    { id: "parcelAddress", label: "2.2. Địa chỉ thửa đất", type: "text" },
                    { id: "landAreaTotal", label: "2.3. Diện tích (m²)", type: "text" },
                    { id: "landAreaPrivate", label: "Trong đó: sử dụng riêng (m²)", type: "text", required: false },
                    { id: "landAreaShared", label: "Sử dụng chung (m²)", type: "text", required: false },
                    { id: "landPurpose", label: "2.4. Mục đích sử dụng đất", type: "text", placeholder: "VD: Đất ở (ONT)" },
                    { id: "landDuration", label: "2.5. Thời hạn sử dụng đất", type: "text", placeholder: "VD: Lâu dài / 50 năm" },
                    { id: "landOrigin", label: "2.6. Nguồn gốc sử dụng đất", type: "textarea", placeholder: "VD: Nhà nước giao đất có thu tiền sử dụng đất" },
                ],
            },
            {
                title: "3. Nhà ở / Tài sản gắn liền với đất (nếu có)",
                questions: [
                    { id: "hasBuilding", label: "Có nhà ở / công trình trên đất?", type: "radio", options: [{ value: "yes", text: "Có" }, { value: "no", text: "Không" }] },
                    { id: "houseType", label: "3.1. Loại nhà ở", type: "select", options: [
                        { value: "biet_thu", text: "Biệt thự" },
                        { value: "nha_rieng_le", text: "Nhà ở riêng lẻ" },
                        { value: "can_ho", text: "Căn hộ chung cư" },
                        { value: "khac", text: "Công trình khác" },
                    ], required: false },
                    { id: "houseAreaBuilt", label: "3.2. Diện tích xây dựng (m²)", type: "text", required: false },
                    { id: "houseAreaFloor", label: "3.3. Diện tích sàn (m²)", type: "text", required: false },
                    { id: "houseFloors", label: "3.4. Số tầng", type: "text", required: false },
                    { id: "houseOwnership", label: "Hình thức sở hữu", type: "select", options: [
                        { value: "rieng", text: "Sở hữu riêng" },
                        { value: "chung", text: "Sở hữu chung" },
                    ], required: false },
                    { id: "houseOrigin", label: "3.5. Nguồn gốc nhà ở", type: "textarea", placeholder: "VD: Tự xây dựng năm 2010, có Giấy phép xây dựng số ...", required: false },
                ],
            },
            {
                title: "4. Đề nghị",
                questions: [
                    { id: "requestRegister", label: "Đề nghị đăng ký QSDĐ", type: "radio", options: [{ value: "yes", text: "Có" }, { value: "no", text: "Không" }] },
                    { id: "requestGCN", label: "Đề nghị cấp GCN QSDĐ", type: "radio", options: [{ value: "yes", text: "Có" }, { value: "no", text: "Không" }] },
                    { id: "requestDebt", label: "Ghi nợ tiền sử dụng đất", type: "radio", options: [{ value: "yes", text: "Có" }, { value: "no", text: "Không" }] },
                    { id: "requestOther", label: "Đề nghị khác", type: "text", required: false },
                ],
            },
            {
                title: "Giấy tờ nộp kèm",
                questions: [
                    { id: "attachDoc1", label: "Giấy tờ kèm theo 1", type: "text", placeholder: "VD: Giấy tờ chứng minh QSDĐ" },
                    { id: "attachDoc2", label: "Giấy tờ kèm theo 2", type: "text", placeholder: "VD: Sơ đồ nhà đất", required: false },
                    { id: "attachDoc3", label: "Giấy tờ kèm theo 3", type: "text", placeholder: "VD: CMND/CCCD", required: false },
                    { id: "attachDoc4", label: "Giấy tờ kèm theo 4", type: "text", required: false },
                ],
            },
            {
                title: "Ký đơn",
                questions: [
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau04ND151,
    },
    mau23: {
        id: "mau23",
        name: "Mẫu số 23",
        title: "Đơn đề nghị điều chỉnh quyết định giao đất / cho thuê đất / cho phép chuyển MĐSDĐ",
        icon: "🔄",
        sections: [
            {
                title: "Người đề nghị",
                questions: [
                    { id: "recipient", label: "Kính gửi", type: "text", placeholder: "VD: UBND quận Thủ Đức" },
                    { id: "fullName", label: "Tên người đề nghị (viết IN HOA)", type: "text", profileKey: "name" },
                    { id: "address", label: "Địa chỉ", type: "text", profileKey: "address" },
                    { id: "phone", label: "Điện thoại", type: "tel", required: false, profileKey: "phone" },
                ],
            },
            {
                title: "Thông tin Quyết định đã có",
                questions: [
                    { id: "decisionNumber", label: "Quyết định số", type: "text", placeholder: "VD: 1234/QĐ-UBND" },
                    { id: "decisionDate", label: "Ngày ký Quyết định", type: "date" },
                    { id: "decisionIssuer", label: "Cơ quan ban hành", type: "text", placeholder: "VD: UBND quận Bình Thạnh" },
                    { id: "decisionContent", label: "Nội dung chính của QĐ", type: "textarea", placeholder: "VD: Giao 200m² đất tại thửa số 100, tờ BĐ 15, phường X..." },
                ],
            },
            {
                title: "Nội dung đề nghị điều chỉnh",
                questions: [
                    { id: "adjustReason", label: "Lý do đề nghị điều chỉnh", type: "textarea", placeholder: "VD: Sai sót về diện tích, thay đổi mục đích sử dụng theo quy hoạch..." },
                    { id: "adjustDetail", label: "Nội dung cụ thể đề nghị điều chỉnh", type: "textarea", placeholder: "VD: Điều chỉnh diện tích từ 200m² thành 220m² theo kết quả đo đạc mới" },
                    { id: "adjustCommitment", label: "Cam kết", type: "textarea", placeholder: "Tôi cam đoan nội dung đề nghị là đúng sự thật..." },
                ],
            },
            {
                title: "Tài liệu kèm theo",
                questions: [
                    { id: "attachDoc1", label: "Tài liệu kèm theo 1", type: "text", placeholder: "VD: Bản sao QĐ giao đất / cho thuê đất" },
                    { id: "attachDoc2", label: "Tài liệu kèm theo 2", type: "text", placeholder: "VD: Bản đồ đo đạc mới (nếu có)", required: false },
                    { id: "attachDoc3", label: "Tài liệu kèm theo 3", type: "text", placeholder: "VD: CMND/CCCD", required: false },
                ],
            },
            {
                title: "Ký đơn",
                questions: [
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau23,
    },
    mau01_bds: {
        id: "mau01_bds",
        name: "Mẫu 01/BĐS",
        title: "Tờ khai thuế đối với hoạt động cho thuê tài sản (cá nhân)",
        icon: "🏘️",
        sections: [
            {
                title: "I. Thông tin người nộp thuế",
                questions: [
                    { id: "fullName", label: "Họ và tên (viết chữ in hoa)", type: "text", placeholder: "VD: NGUYỄN VĂN A", profileKey: "name" },
                    { id: "taxCode", label: "Mã số thuế cho thuê BĐS", type: "text", placeholder: "VD: 0312345678-001" },
                    { id: "idNumber", label: "Số CMND/CCCD/Định danh cá nhân", type: "text", profileKey: "idNumber" },
                    { id: "address", label: "Địa chỉ cư trú", type: "text", profileKey: "address" },
                    { id: "phone", label: "Điện thoại", type: "tel", required: false, profileKey: "phone" },
                    { id: "email", label: "Email", type: "email", required: false, profileKey: "email" },
                ],
            },
            {
                title: "II. Thông tin bất động sản cho thuê",
                questions: [
                    { id: "bdsAddress1", label: "Địa chỉ BĐS cho thuê (1)", type: "text", placeholder: "VD: Số 10, Lê Lợi, P.Bến Nghé, Q.1, TP.HCM" },
                    { id: "bdsType1", label: "Loại BĐS (1)", type: "select", options: [
                        { value: "nha_o", text: "Nhà ở" },
                        { value: "mat_bang", text: "Mặt bằng kinh doanh" },
                        { value: "can_ho", text: "Căn hộ chung cư" },
                        { value: "dat_trong", text: "Đất trống" },
                        { value: "kho_xuong", text: "Kho/Xưởng" },
                        { value: "khac", text: "Loại khác" },
                    ]},
                    { id: "bdsArea1", label: "Diện tích cho thuê (m²)", type: "text", placeholder: "VD: 120" },
                    { id: "tenantName1", label: "Tên bên thuê (1)", type: "text", placeholder: "VD: Công ty TNHH ABC / Ông Trần Văn B" },
                    { id: "tenantId1", label: "MST/CCCD bên thuê (1)", type: "text", placeholder: "VD: 0312345678" },
                ],
            },
            {
                title: "III. Hợp đồng & doanh thu",
                questions: [
                    { id: "contractNumber", label: "Số hợp đồng cho thuê", type: "text", placeholder: "VD: HĐ-01/2026" },
                    { id: "contractFrom", label: "Thời hạn thuê từ ngày", type: "date" },
                    { id: "contractTo", label: "Đến ngày", type: "date" },
                    { id: "monthlyRent", label: "Giá thuê/tháng (VNĐ)", type: "text", placeholder: "VD: 50000000" },
                    { id: "annualRevenue", label: "Tổng doanh thu cho thuê/năm (VNĐ)", type: "text", placeholder: "VD: 600000000" },
                ],
            },
            {
                title: "IV. Kỳ tính thuế & kê khai",
                questions: [
                    { id: "taxYear", label: "Năm tính thuế", type: "text", placeholder: "VD: 2026" },
                    { id: "filingType", label: "Loại tờ khai", type: "select", options: [
                        { value: "lan_dau", text: "Lần đầu" },
                        { value: "bo_sung", text: "Bổ sung lần thứ ..." },
                    ]},
                    { id: "filingPeriod", label: "Kỳ kê khai", type: "select", options: [
                        { value: "nam", text: "Cả năm (hạn 31/01 năm sau)" },
                        { value: "6thang_1", text: "6 tháng đầu (hạn 31/07)" },
                        { value: "6thang_2", text: "6 tháng cuối (hạn 31/01 năm sau)" },
                    ]},
                    { id: "revenueThreshold", label: "Doanh thu có vượt ngưỡng 1 tỷ/năm?", type: "radio", options: [
                        { value: "no", text: "Không — ≤ 1 tỷ (không phát sinh thuế)" },
                        { value: "yes", text: "Có — > 1 tỷ (phát sinh thuế GTGT + TNCN)" },
                    ]},
                ],
            },
            {
                title: "V. Tính thuế (nếu phát sinh)",
                questions: [
                    { id: "taxableRevenue", label: "Doanh thu chịu thuế (VNĐ)", type: "text", placeholder: "VD: 1200000000", required: false },
                    { id: "vatRate", label: "Thuế suất GTGT (%)", type: "text", placeholder: "5", required: false },
                    { id: "vatAmount", label: "Thuế GTGT phải nộp (VNĐ)", type: "text", placeholder: "VD: 60000000", required: false },
                    { id: "pitRate", label: "Thuế suất TNCN (%)", type: "text", placeholder: "5", required: false },
                    { id: "pitAmount", label: "Thuế TNCN phải nộp (VNĐ)", type: "text", placeholder: "VD: 60000000", required: false },
                    { id: "totalTax", label: "Tổng thuế phải nộp (VNĐ)", type: "text", placeholder: "VD: 120000000", required: false },
                ],
            },
            {
                title: "Ký tờ khai",
                questions: [
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau01BDS,
    },
    mau01_bk_bds: {
        id: "mau01_bk_bds",
        name: "Mẫu 01/BK-BĐS",
        title: "Phụ lục Bảng kê chi tiết bất động sản cho thuê",
        icon: "📊",
        sections: [
            {
                title: "Thông tin người nộp thuế",
                questions: [
                    { id: "fullName", label: "Họ và tên (viết chữ in hoa)", type: "text", profileKey: "name" },
                    { id: "taxCode", label: "Mã số thuế cho thuê BĐS", type: "text", placeholder: "VD: 0312345678-001" },
                    { id: "taxYear", label: "Năm tính thuế", type: "text", placeholder: "VD: 2026" },
                    { id: "filingPeriod", label: "Kỳ kê khai", type: "select", options: [
                        { value: "nam", text: "Cả năm" },
                        { value: "6thang_1", text: "6 tháng đầu" },
                        { value: "6thang_2", text: "6 tháng cuối" },
                    ]},
                ],
            },
            {
                title: "Bất động sản cho thuê thứ 1",
                questions: [
                    { id: "bds1Address", label: "Địa chỉ BĐS (1)", type: "text", placeholder: "VD: Số 10, Lê Lợi, Q.1, TP.HCM" },
                    { id: "bds1Type", label: "Loại BĐS (1)", type: "select", options: [
                        { value: "nha_o", text: "Nhà ở" }, { value: "mat_bang", text: "Mặt bằng KD" }, { value: "can_ho", text: "Căn hộ" }, { value: "dat_trong", text: "Đất trống" }, { value: "kho_xuong", text: "Kho/Xưởng" }, { value: "khac", text: "Khác" },
                    ]},
                    { id: "bds1Area", label: "Diện tích (m²)", type: "text" },
                    { id: "bds1Tenant", label: "Tên bên thuê (1)", type: "text" },
                    { id: "bds1TenantId", label: "MST/CCCD bên thuê (1)", type: "text" },
                    { id: "bds1ContractNo", label: "Số hợp đồng (1)", type: "text" },
                    { id: "bds1From", label: "Thuê từ ngày", type: "date" },
                    { id: "bds1To", label: "Đến ngày", type: "date" },
                    { id: "bds1Monthly", label: "Giá thuê/tháng (VNĐ)", type: "text" },
                    { id: "bds1Annual", label: "Doanh thu/năm (VNĐ)", type: "text" },
                ],
            },
            {
                title: "Bất động sản cho thuê thứ 2",
                questions: [
                    { id: "bds2Address", label: "Địa chỉ BĐS (2)", type: "text", required: false },
                    { id: "bds2Type", label: "Loại BĐS (2)", type: "select", options: [
                        { value: "", text: "-- Chọn --" }, { value: "nha_o", text: "Nhà ở" }, { value: "mat_bang", text: "Mặt bằng KD" }, { value: "can_ho", text: "Căn hộ" }, { value: "dat_trong", text: "Đất trống" }, { value: "kho_xuong", text: "Kho/Xưởng" }, { value: "khac", text: "Khác" },
                    ], required: false },
                    { id: "bds2Area", label: "Diện tích (m²)", type: "text", required: false },
                    { id: "bds2Tenant", label: "Tên bên thuê (2)", type: "text", required: false },
                    { id: "bds2TenantId", label: "MST/CCCD bên thuê (2)", type: "text", required: false },
                    { id: "bds2ContractNo", label: "Số hợp đồng (2)", type: "text", required: false },
                    { id: "bds2From", label: "Thuê từ ngày", type: "date", required: false },
                    { id: "bds2To", label: "Đến ngày", type: "date", required: false },
                    { id: "bds2Monthly", label: "Giá thuê/tháng (VNĐ)", type: "text", required: false },
                    { id: "bds2Annual", label: "Doanh thu/năm (VNĐ)", type: "text", required: false },
                ],
            },
            {
                title: "Tổng hợp & Ký",
                questions: [
                    { id: "totalAnnualRevenue", label: "Tổng doanh thu tất cả BĐS/năm (VNĐ)", type: "text", placeholder: "VD: 1300000000" },
                    { id: "signPlace", label: "Nơi ký", type: "text", profileKey: "province" },
                    { id: "signDate", label: "Ngày ký", type: "date" },
                ],
            },
        ],
        render: renderMau01BKBDS,
    },
};

// ================================================================
// PROFILE
// ================================================================
const PROFILE_KEY = "formFillerProfile";
function loadProfile() { try { return JSON.parse(localStorage.getItem(PROFILE_KEY)) || {}; } catch { return {}; } }
function saveProfile(data) { localStorage.setItem(PROFILE_KEY, JSON.stringify(data)); }
function getProfileFieldCount() { return Object.values(loadProfile()).filter(v => v && v.trim()).length; }

function applyProfileToAnswers() {
    const profile = loadProfile();
    const filled = new Set();
    flatQuestions.forEach(q => {
        if (q.profileKey && profile[q.profileKey] && !answers[q.id]) { answers[q.id] = profile[q.profileKey]; filled.add(q.id); }
    });
    return filled;
}

function updateProfileFromAnswers() {
    const profile = loadProfile();
    let changed = false;
    flatQuestions.forEach(q => {
        if (q.profileKey && answers[q.id] && answers[q.id].trim() && profile[q.profileKey] !== answers[q.id]) { profile[q.profileKey] = answers[q.id]; changed = true; }
    });
    if (changed) saveProfile(profile);
}

// ================================================================
// PERSISTENCE
// ================================================================
function loadChecklist(procId) { try { return JSON.parse(localStorage.getItem(`cl_${procId}`)) || {}; } catch { return {}; } }
function saveChecklist(procId, data) { localStorage.setItem(`cl_${procId}`, JSON.stringify(data)); }
function loadFilledForms(procId) { try { return JSON.parse(localStorage.getItem(`ff_${procId}`)) || {}; } catch { return {}; } }
function markFormFilled(procId, formId) { const d = loadFilledForms(procId); d[formId] = true; localStorage.setItem(`ff_${procId}`, JSON.stringify(d)); }
function loadIntakeContext(procId) { try { return JSON.parse(localStorage.getItem(`ctx_${procId}`)) || {}; } catch { return {}; } }
function saveIntakeContext(procId, ctx) { localStorage.setItem(`ctx_${procId}`, JSON.stringify(ctx)); }

// ================================================================
// STATE
// ================================================================
let currentProcId = null;
let currentFormId = null;
let currentTab = "intake";
let currentQuestionIndex = 0;
let answers = {};
let flatQuestions = [];
let autofilledFields = new Set();
let eligibilityAnswers = {};
let selectedCategory = "all";
let intakeContext = {};
let resolvedWF = null;
let currentProfileTab = "personal";
let uploadedDocuments = {};

// ================================================================
// DOM
// ================================================================
const $ = (sel) => document.querySelector(sel);
const viewHome = $("#view-home");
const viewProcedure = $("#view-procedure");
const viewQuestionnaire = $("#view-questionnaire");
const viewPreview = $("#view-preview");
const viewCalculator = $("#view-calculator");
const profileModal = $("#profile-modal");
const profileBanner = $("#profile-banner");

// ================================================================
// TOAST NOTIFICATIONS
// ================================================================
function showToast(msg, type = "success", ms = 3500) {
    const container = $("#toast-container");
    if (!container) return;
    const icons = { success: "✓", error: "✕", info: "ℹ" };
    const toast = document.createElement("div");
    toast.className = `toast toast--${type}`;
    toast.innerHTML = `<span>${icons[type] || ""}</span><span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add("toast-out");
        toast.addEventListener("animationend", () => toast.remove());
    }, ms);
}

// ================================================================
// DARK MODE
// ================================================================
const DARK_MODE_KEY = "plnd_dark_mode";

function initDarkMode() {
    const saved = localStorage.getItem(DARK_MODE_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (saved === "true" || (saved === null && prefersDark)) {
        document.documentElement.classList.add("dark");
    }
    updateDarkModeIcon();
}

function toggleDarkMode() {
    document.documentElement.classList.toggle("dark");
    const isDark = document.documentElement.classList.contains("dark");
    localStorage.setItem(DARK_MODE_KEY, isDark);
    updateDarkModeIcon();
}

function updateDarkModeIcon() {
    const btn = $("#btn-dark-mode");
    if (!btn) return;
    const isDark = document.documentElement.classList.contains("dark");
    btn.innerHTML = isDark
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/></svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>`;
    btn.title = isDark ? "Chế độ sáng" : "Chế độ tối";
}

// ================================================================
// FORM HISTORY
// ================================================================
const FORM_HISTORY_KEY = "plnd_form_history";
const MAX_HISTORY = 20;

function saveFormHistory(procId, formId, ans) {
    const history = loadFormHistory();
    const proc = PROCEDURES[procId];
    const form = FORMS[formId];
    history.unshift({
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        procId,
        formId,
        procName: proc ? proc.shortName || proc.name : procId,
        formName: form ? form.name : formId,
        formTitle: form ? form.title : "",
        answers: { ...ans },
        timestamp: new Date().toISOString(),
    });
    if (history.length > MAX_HISTORY) history.length = MAX_HISTORY;
    localStorage.setItem(FORM_HISTORY_KEY, JSON.stringify(history));
}

function loadFormHistory() {
    try { return JSON.parse(localStorage.getItem(FORM_HISTORY_KEY)) || []; }
    catch { return []; }
}

function deleteFormHistoryItem(id) {
    const history = loadFormHistory().filter(h => h.id !== id);
    localStorage.setItem(FORM_HISTORY_KEY, JSON.stringify(history));
    renderFormHistory();
    showToast("Đã xóa khỏi lịch sử", "info");
}

function restoreFormHistory(item) {
    if (!FORMS[item.formId]) { showToast("Biểu mẫu không tồn tại", "error"); return; }
    answers = { ...item.answers };
    currentQuestionIndex = 0;
    currentProcId = item.procId;
    currentFormId = item.formId;
    if (PROCEDURES[item.procId]) markFormFilled(item.procId, item.formId);
    $("#form-output").innerHTML = FORMS[item.formId].render(answers);
    hideAll();
    viewPreview.classList.remove("hidden");
    showToast("Đã tải lại biểu mẫu", "success");
}

function renderFormHistory() {
    const el = $("#form-history");
    if (!el) return;
    const history = loadFormHistory();
    if (!history.length) {
        el.classList.add("hidden");
        return;
    }
    el.classList.remove("hidden");
    const formatTime = (iso) => {
        const d = new Date(iso);
        const now = new Date();
        const diffMs = now - d;
        const diffMin = Math.floor(diffMs / 60000);
        if (diffMin < 1) return "Vừa xong";
        if (diffMin < 60) return `${diffMin} phút trước`;
        const diffH = Math.floor(diffMin / 60);
        if (diffH < 24) return `${diffH} giờ trước`;
        const diffD = Math.floor(diffH / 24);
        if (diffD < 7) return `${diffD} ngày trước`;
        return d.toLocaleDateString("vi-VN");
    };
    el.innerHTML = `
        <div class="flex items-center justify-between mb-3">
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <span class="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-sm">📋</span>
                Biểu mẫu đã điền
            </h3>
            <span class="text-xs text-gray-400 dark:text-gray-500">${history.length} mục</span>
        </div>
        <div class="space-y-2">
            ${history.slice(0, 5).map(h => `
                <div class="history-card" data-hid="${h.id}">
                    <div class="w-10 h-10 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-lg flex-shrink-0">${PROCEDURES[h.procId]?.icon || "📄"}</div>
                    <div class="flex-1 min-w-0">
                        <div class="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">${h.formName}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400">${h.procName} · ${formatTime(h.timestamp)}</div>
                    </div>
                    <div class="flex items-center gap-1 flex-shrink-0">
                        <button class="history-view px-2.5 py-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Xem lại">Xem lại</button>
                        <button class="history-del p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors" title="Xóa" aria-label="Xóa">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                    </div>
                </div>
            `).join("")}
            ${history.length > 5 ? `<div class="text-center text-xs text-gray-400 dark:text-gray-500 pt-1">và ${history.length - 5} mục khác</div>` : ""}
        </div>
    `;
    el.querySelectorAll(".history-view").forEach(btn => {
        const card = btn.closest("[data-hid]");
        const item = history.find(h => h.id === card.dataset.hid);
        if (item) btn.addEventListener("click", () => restoreFormHistory(item));
    });
    el.querySelectorAll(".history-del").forEach(btn => {
        const card = btn.closest("[data-hid]");
        btn.addEventListener("click", (e) => { e.stopPropagation(); deleteFormHistoryItem(card.dataset.hid); });
    });
}

// ================================================================
// INIT
// ================================================================
function init() {
    initDarkMode();
    renderCategories();
    renderProcedureList();
    renderProfileBanner();
    renderFormHistory();

    $("#btn-home").addEventListener("click", showHome);
    $("#btn-back-home").addEventListener("click", showHome);
    $("#btn-back-proc").addEventListener("click", () => showProcedure(currentProcId));
    $("#btn-back-form").addEventListener("click", () => showQuestionnaireView(currentFormId, false));
    $("#btn-prev").addEventListener("click", prevQuestion);
    $("#btn-next").addEventListener("click", nextQuestion);
    $("#btn-generate").addEventListener("click", generateForm);
    $("#btn-print").addEventListener("click", () => window.print());
    $("#btn-export-pdf").addEventListener("click", exportPDF);

    $("#btn-profile").addEventListener("click", openProfileModal);
    $("#btn-close-profile").addEventListener("click", closeProfileModal);
    $("#profile-overlay").addEventListener("click", closeProfileModal);
    $("#btn-save-profile").addEventListener("click", onSaveProfile);
    $("#btn-clear-profile").addEventListener("click", onClearProfile);
    $("#btn-dark-mode").addEventListener("click", toggleDarkMode);

    const profileTabs = $("#profile-tabs");
    if (profileTabs) {
        profileTabs.addEventListener("click", (e) => {
            const tab = e.target.closest(".profile-tab");
            if (tab && tab.dataset.ptab) switchProfileTab(tab.dataset.ptab);
        });
    }

    initCalculator();
    initDocScanner();
}

// ================================================================
// VIEW SWITCHING
// ================================================================
function hideAll() { [viewHome, viewProcedure, viewQuestionnaire, viewPreview, viewCalculator].forEach(v => v.classList.add("hidden")); }

function showHome() { hideAll(); viewHome.classList.remove("hidden"); renderProfileBanner(); renderFormHistory(); }

function showProcedure(procId) {
    currentProcId = procId;
    intakeContext = loadIntakeContext(procId);
    resolvedWF = null;
    const proc = PROCEDURES[procId];
    if (isIntakeComplete(proc, intakeContext)) {
        resolvedWF = resolveWorkflow(proc, intakeContext);
    }
    hideAll();
    viewProcedure.classList.remove("hidden");
    renderProcedureHeader();
    renderWorkflowTabs();
    renderTabContent();
}

function showQuestionnaireView(formId, reset) {
    currentFormId = formId;
    const form = FORMS[formId];
    if (reset) { answers = {}; currentQuestionIndex = 0; }
    flatQuestions = [];
    form.sections.forEach(s => s.questions.forEach(q => flatQuestions.push({ ...q, sectionTitle: s.title })));
    if (reset) autofilledFields = applyProfileToAnswers();
    $("#form-title").textContent = `${form.name} — ${form.title}`;
    $("#form-subtitle").textContent = currentProcId ? PROCEDURES[currentProcId].name : "";
    hideAll();
    viewQuestionnaire.classList.remove("hidden");
    renderQuestion();
}

// ================================================================
// HOME
// ================================================================
function renderCategories() {
    const el = $("#category-tabs");
    el.innerHTML = CATEGORIES.map(c => `<button class="cat-tab ${c.id === selectedCategory ? 'active' : ''}" data-cat="${c.id}">${c.icon} ${c.name}</button>`).join("");
    el.querySelectorAll(".cat-tab").forEach(b => b.addEventListener("click", () => { selectedCategory = b.dataset.cat; renderCategories(); renderProcedureList(); }));
}

function renderProcedureList() {
    const el = $("#procedure-list");
    const procs = Object.values(PROCEDURES).filter(p => selectedCategory === "all" || p.category === selectedCategory);
    if (!procs.length) { el.innerHTML = `<div class="col-span-2 text-center py-12 text-gray-400 dark:text-gray-500">Chưa có thủ tục nào trong danh mục này</div>`; return; }
    el.innerHTML = procs.map(p => `
        <button class="proc-card p-5 text-left focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900" data-proc="${p.id}">
            <div class="flex items-start gap-3">
                <div class="w-12 h-12 bg-emerald-50 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0">${p.icon}</div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-semibold text-gray-800 dark:text-gray-100 leading-snug">${p.name}</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${p.agency} — ${p.level}</p>
                    <div class="flex flex-wrap gap-2 mt-3">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">⏱ ${p.estimatedDays}</span>
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">📄 ${p.baseRequirements.filter(r => r.required && r.active).length}+ hồ sơ</span>
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-700/50 text-xs text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-gray-700">📝 ${p.baseForms.length} biểu mẫu</span>
                    </div>
                </div>
                <svg class="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </div>
        </button>
    `).join("");
    el.querySelectorAll("[data-proc]").forEach(c => c.addEventListener("click", () => showProcedure(c.dataset.proc)));
}

// ================================================================
// PROCEDURE WORKFLOW
// ================================================================
const TABS = [
    { id: "intake", label: "Tài liệu", num: "1" },
    { id: "overview", label: "Tổng quan", num: "2" },
    { id: "eligibility", label: "Điều kiện", num: "3" },
    { id: "checklist", label: "Hồ sơ", num: "4" },
    { id: "forms", label: "Biểu mẫu", num: "5" },
    { id: "steps", label: "Các bước nộp", num: "6" },
];

function renderProcedureHeader() {
    const p = PROCEDURES[currentProcId];
    $("#proc-icon").textContent = p.icon;
    $("#proc-title").textContent = p.name;
    $("#proc-meta").innerHTML = `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-xs font-medium border border-gray-100 dark:border-gray-700">🏛️ ${p.agency}</span><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-xs font-medium border border-gray-100 dark:border-gray-700">📍 ${p.level}</span><span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-xs font-medium border border-gray-100 dark:border-gray-700">⏱ ${p.estimatedDays}</span>`;
}

function updateScrollFade(container) {
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    container.classList.toggle("can-scroll-left", scrollLeft > 2);
    container.classList.toggle("can-scroll-right", scrollLeft + clientWidth < scrollWidth - 2);
}

function renderWorkflowTabs() {
    const el = $("#workflow-tabs");
    const locked = !resolvedWF;
    el.innerHTML = TABS.map(t => {
        const isLocked = locked && t.id !== "intake";
        return `<button class="wf-tab ${t.id === currentTab ? 'active' : ''} ${isLocked ? 'opacity-40 cursor-not-allowed' : ''}" data-tab="${t.id}" ${isLocked ? 'disabled' : ''}>
            <span class="tab-badge">${t.num}</span> ${t.label}
        </button>`;
    }).join("");
    el.querySelectorAll(".wf-tab:not([disabled])").forEach(b => b.addEventListener("click", () => { currentTab = b.dataset.tab; renderWorkflowTabs(); renderTabContent(); }));
    updateScrollFade(el);
    el.addEventListener("scroll", () => updateScrollFade(el), { passive: true });
    const activeTab = el.querySelector(".wf-tab.active");
    if (activeTab) activeTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
}

function renderTabContent() {
    const el = $("#workflow-content");
    const p = PROCEDURES[currentProcId];
    switch (currentTab) {
        case "intake": return renderIntake(el, p);
        case "overview": return renderOverview(el, p);
        case "eligibility": return renderEligibility(el, p);
        case "checklist": return renderChecklist(el, p);
        case "forms": return renderFormCards(el);
        case "steps": return renderSteps(el);
    }
}

// --- TAB: INTAKE ---
function renderIntake(el, p) {
    uploadedDocuments = loadUploadedDocs(currentProcId);

    const inferred = inferIntakeFromDocuments(p, uploadedDocuments);
    const reasons = inferred._reasons || {};
    delete inferred._reasons;

    for (const [k, v] of Object.entries(inferred)) {
        if (!intakeContext[k] || intakeContext["_auto_" + k]) {
            intakeContext[k] = v;
            intakeContext["_auto_" + k] = true;
        }
    }

    p.intake.forEach(q => {
        if (q.showIf && !q.showIf(intakeContext)) delete intakeContext[q.id];
    });

    saveIntakeContext(currentProcId, intakeContext);
    const complete = isIntakeComplete(p, intakeContext);
    if (complete) {
        resolvedWF = resolveWorkflow(p, intakeContext);
    }

    const allReqs = complete ? resolvedWF.requirements : p.baseRequirements.filter(r => r.active);
    const uploadableReqs = allReqs.filter(r => REQUIREMENT_DOC_TYPE_MAP[r.id]);

    const uploadedCount = uploadableReqs.filter(r => uploadedDocuments[r.id]).length;
    const totalUploadable = uploadableReqs.length;

    const hasUploads = uploadedCount > 0;
    const docGridOpen = hasUploads || (el._docGridOpen === true);

    const visibleQuestions = p.intake.filter(q => !q.showIf || q.showIf(intakeContext));
    const unanswered = visibleQuestions.filter(q => !intakeContext[q.id]);

    el.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 mb-4" style="box-shadow: var(--shadow-xs)">
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">Xác định tình huống của bạn</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Chọn các thông tin bên dưới để hệ thống xác định quy trình phù hợp.</p>
            <div class="space-y-4">
                ${p.intake.map(q => {
                    const visible = !q.showIf || q.showIf(intakeContext);
                    if (!visible) return "";
                    const isAuto = intakeContext["_auto_" + q.id];
                    const reason = reasons[q.id];
                    return `
                    <div>
                        <div class="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">${q.question}${isAuto && reason ? ` <span class="text-xs text-emerald-500 font-normal ml-1">(tự động — ${reason})</span>` : ""}</div>
                        <div class="flex flex-wrap gap-2">
                            ${q.options.map(o => `
                                <button type="button" class="intake-pill ${intakeContext[q.id] === o.value ? 'intake-pill--active' : ''}" data-intake-id="${q.id}" data-intake-val="${o.value}">${o.label}</button>
                            `).join("")}
                        </div>
                    </div>`;
                }).join("")}
            </div>
        </div>

        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 mb-4" style="box-shadow: var(--shadow-xs)">
            <button type="button" class="w-full p-5 flex items-center justify-between text-left" id="toggle-doc-grid">
                <div>
                    <h3 class="font-semibold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                        <svg class="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                        Tải lên giấy tờ
                        <span class="text-xs font-normal text-gray-400 dark:text-gray-500">— Tùy chọn, giúp điền nhanh hơn</span>
                    </h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">Chụp ảnh hoặc tải lên tài liệu để hệ thống tự nhận dạng, tự chọn tình huống và tự điền biểu mẫu.</p>
                </div>
                <div class="flex items-center gap-2 flex-shrink-0 ml-4">
                    ${uploadedCount > 0 ? `<span class="text-xs font-medium text-emerald-600">${uploadedCount}/${totalUploadable}</span>` : ""}
                    <svg class="w-5 h-5 text-gray-400 transition-transform ${docGridOpen ? 'rotate-180' : ''}" id="doc-grid-chevron" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/></svg>
                </div>
            </button>
            <div class="${docGridOpen ? '' : 'hidden'}" id="doc-grid-content">
                <div class="px-5 pb-5">
                    <div class="grid gap-3 sm:grid-cols-2">
                        ${uploadableReqs.map(r => {
                            const doc = uploadedDocuments[r.id];
                            const isUploaded = !!doc;
                            return `
                            <div class="doc-upload-card ${isUploaded ? 'doc-upload-card--uploaded' : ''}" data-req-id="${r.id}" data-doc-type="${REQUIREMENT_DOC_TYPE_MAP[r.id]}">
                                <div class="flex items-start gap-3">
                                    <div class="w-10 h-10 rounded-xl ${isUploaded ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600' : 'bg-gray-100 dark:bg-gray-700 text-gray-400'} flex items-center justify-center flex-shrink-0">
                                        ${isUploaded
                                            ? '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>'
                                            : '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg>'
                                        }
                                    </div>
                                    <div class="flex-1 min-w-0">
                                        <div class="text-sm font-medium text-gray-800 dark:text-gray-100 truncate">${r.name}</div>
                                        <div class="text-xs mt-0.5 ${isUploaded ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-400 dark:text-gray-500'}">${isUploaded ? 'Đã nhận dạng ✓' : (r.required ? 'Bắt buộc' : 'Tùy chọn')}</div>
                                    </div>
                                </div>
                                <button type="button" class="doc-upload-card__btn mt-2" data-req-id="${r.id}">${isUploaded ? 'Quét lại' : 'Chụp / Tải lên'}</button>
                            </div>`;
                        }).join("")}
                    </div>
                </div>
            </div>
        </div>

        ${complete ? `
        <div class="bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-2xl p-4 flex items-center justify-between">
            <div class="flex items-center gap-3">
                <span class="text-2xl">✅</span>
                <div>
                    <div class="font-semibold text-emerald-800 dark:text-emerald-300">Tình huống đã xác định!</div>
                    <div class="text-sm text-emerald-600 dark:text-emerald-400">Hệ thống đã tùy chỉnh quy trình cho trường hợp của bạn.</div>
                </div>
            </div>
            <button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-md" id="btn-to-overview">Xem tổng quan →</button>
        </div>` : `
        <div class="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-4 text-center text-sm text-gray-500 dark:text-gray-400">
            Vui lòng chọn ${unanswered.length} mục còn lại ở trên để tiếp tục.
        </div>`}
    `;

    el.querySelectorAll(".intake-pill").forEach(btn => {
        btn.addEventListener("click", () => {
            const qId = btn.dataset.intakeId;
            intakeContext[qId] = btn.dataset.intakeVal;
            delete intakeContext["_auto_" + qId];
            p.intake.forEach(q => {
                if (q.showIf && !q.showIf(intakeContext)) delete intakeContext[q.id];
            });
            saveIntakeContext(currentProcId, intakeContext);
            if (isIntakeComplete(p, intakeContext)) {
                resolvedWF = resolveWorkflow(p, intakeContext);
            } else {
                resolvedWF = null;
            }
            renderWorkflowTabs();
            renderIntake(el, p);
        });
    });

    const toggleBtn = el.querySelector("#toggle-doc-grid");
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            const content = el.querySelector("#doc-grid-content");
            const chevron = el.querySelector("#doc-grid-chevron");
            if (content) content.classList.toggle("hidden");
            if (chevron) chevron.classList.toggle("rotate-180");
            el._docGridOpen = content && !content.classList.contains("hidden");
        });
    }

    el.querySelectorAll(".doc-upload-card__btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const reqId = btn.dataset.reqId;
            const docType = REQUIREMENT_DOC_TYPE_MAP[reqId];
            openScanModal("personal", reqId, docType);
        });
    });

    const toOverview = el.querySelector("#btn-to-overview");
    if (toOverview) toOverview.addEventListener("click", () => { currentTab = "overview"; renderWorkflowTabs(); renderTabContent(); });
}

// --- TAB: OVERVIEW ---
function renderOverview(el, p) {
    if (!resolvedWF) return;
    const wf = resolvedWF;

    el.innerHTML = `
        ${wf.notes.length || wf.warnings.length ? `
        <div class="space-y-2 mb-6">
            ${wf.notes.map(n => `<div class="rounded-2xl p-3 text-sm bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-300">${n}</div>`).join("")}
            ${wf.warnings.map(w => `<div class="rounded-2xl p-3 text-sm bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300">${w}</div>`).join("")}
        </div>` : ""}

        <div class="grid gap-6 md:grid-cols-2">
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5" style="box-shadow: var(--shadow-xs)">
                <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><span class="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-sm">💰</span> Chi phí áp dụng</h3>
                <ul class="space-y-2">
                    ${wf.fees.map(f => `<li class="flex justify-between text-sm"><span class="text-gray-600 dark:text-gray-300">${f.name} ${f.note ? `<span class="text-xs text-green-600 dark:text-green-400">(${f.note})</span>` : ""}</span><span class="font-medium text-gray-800 dark:text-gray-100">${f.amount}</span></li>`).join("")}
                    ${wf.fees.length === 0 ? '<li class="text-sm text-green-600 font-medium">Không phát sinh thuế/phí</li>' : ""}
                </ul>
                ${p.baseFees.filter(bf => !wf.fees.find(wf2 => wf2.id === bf.id)).length > 0 ? `
                <div class="mt-3 pt-3 border-t border-gray-100">
                    <div class="text-xs text-gray-400 dark:text-gray-500 mb-1">Đã miễn:</div>
                    ${p.baseFees.filter(bf => !wf.fees.find(wf2 => wf2.id === bf.id)).map(bf => `<div class="text-xs text-green-600 line-through">${bf.name}</div>`).join("")}
                </div>` : ""}
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5" style="box-shadow: var(--shadow-xs)">
                <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><span class="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-sm">📚</span> Căn cứ pháp lý</h3>
                <ul class="space-y-2">
                    ${p.legalBasis.map(l => `<li class="text-sm text-gray-600 dark:text-gray-300 flex items-start gap-2"><span class="text-emerald-500 mt-0.5">•</span>${l}</li>`).join("")}
                </ul>
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 md:col-span-2" style="box-shadow: var(--shadow-xs)">
                <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2"><span class="w-8 h-8 bg-emerald-50 dark:bg-emerald-900/30 rounded-xl flex items-center justify-center text-sm">📋</span> Quy trình ${wf.steps.length} bước</h3>
                <div class="flex flex-wrap gap-2">
                    ${wf.steps.map((s, i) => `<div class="flex items-center gap-2"><span class="w-7 h-7 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">${s.order}</span><span class="text-sm text-gray-700 dark:text-gray-300">${s.title}</span>${i < wf.steps.length - 1 ? '<svg class="w-4 h-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>' : ''}</div>`).join("")}
                </div>
            </div>
        </div>
        <div class="mt-6 text-center">
            <button class="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-md" id="btn-to-elig">Kiểm tra điều kiện →</button>
        </div>
    `;
    $("#btn-to-elig").addEventListener("click", () => { currentTab = "eligibility"; renderWorkflowTabs(); renderTabContent(); });
}

// --- TAB: ELIGIBILITY ---
function renderEligibility(el, p) {
    if (!resolvedWF) return;
    if (!eligibilityAnswers[currentProcId]) eligibilityAnswers[currentProcId] = {};
    const ea = eligibilityAnswers[currentProcId];
    const items = resolvedWF.eligibility;
    const allAnswered = items.every(e => ea[e.id] !== undefined);
    const allPass = allAnswered && items.every(e => ea[e.id] === true);
    const hasFail = items.some(e => ea[e.id] === false);

    el.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 mb-4" style="box-shadow: var(--shadow-xs)">
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">Kiểm tra điều kiện</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Xác nhận bất động sản đủ điều kiện thực hiện thủ tục.</p>
            <div class="space-y-3">
                ${items.map(e => {
                    const st = ea[e.id] === true ? "pass" : ea[e.id] === false ? "fail" : "";
                    return `<div class="elig-item ${st}"><div class="flex-1"><div class="text-sm font-medium text-gray-800 dark:text-gray-100">${e.question}</div>${ea[e.id] === false ? `<div class="text-sm text-red-600 dark:text-red-400 mt-1">${e.failMessage}</div>` : ""}</div><div class="flex gap-2 flex-shrink-0"><button class="elig-btn ${ea[e.id] === true ? 'yes' : ''}" data-eid="${e.id}" data-val="yes">Có</button><button class="elig-btn ${ea[e.id] === false ? 'no' : ''}" data-eid="${e.id}" data-val="no">Không</button></div></div>`;
                }).join("")}
            </div>
        </div>
        ${allPass ? `<div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><span class="text-2xl">✅</span><div><div class="font-semibold text-green-800 dark:text-green-300">Đủ điều kiện!</div><div class="text-sm text-green-600 dark:text-green-400">Tiến hành chuẩn bị hồ sơ.</div></div></div><button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-md" id="btn-to-cl">Chuẩn bị hồ sơ →</button></div>` : ""}
        ${hasFail ? `<div class="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-2xl p-4 flex items-center gap-3"><span class="text-2xl">⚠️</span><div><div class="font-semibold text-red-800 dark:text-red-300">Chưa đủ điều kiện</div><div class="text-sm text-red-600 dark:text-red-400">Giải quyết các vấn đề trên trước khi tiếp tục.</div></div></div>` : ""}
    `;
    el.querySelectorAll(".elig-btn").forEach(b => b.addEventListener("click", () => { ea[b.dataset.eid] = b.dataset.val === "yes"; renderEligibility(el, p); }));
    const toCl = el.querySelector("#btn-to-cl");
    if (toCl) toCl.addEventListener("click", () => { currentTab = "checklist"; renderWorkflowTabs(); renderTabContent(); });
}

// --- TAB: CHECKLIST ---
function renderChecklist(el, p) {
    if (!resolvedWF) return;
    const cl = loadChecklist(currentProcId);
    uploadedDocuments = loadUploadedDocs(currentProcId);
    const req = resolvedWF.requirements.filter(r => r.required);
    const opt = resolvedWF.requirements.filter(r => !r.required);
    const done = req.filter(r => cl[r.id]).length;
    const pct = req.length > 0 ? Math.round((done / req.length) * 100) : 0;

    const groupLabels = { cong_chung: "Giai đoạn 1: Công chứng", thue: "Giai đoạn 2: Khai thuế", bien_dong: "Giai đoạn 3: Đăng ký biến động" };
    const groupIcons = {
        cong_chung: '<svg class="check-group-header__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>',
        thue: '<svg class="check-group-header__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"/></svg>',
        bien_dong: '<svg class="check-group-header__icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/></svg>',
    };

    const renderItem = (r, showBadge) => {
        const isUploadable = !!REQUIREMENT_DOC_TYPE_MAP[r.id];
        const isUploaded = !!uploadedDocuments[r.id];
        return `
        <div class="check-item ${cl[r.id] ? 'checked' : ''}" data-check="${r.id}">
            <div class="check-box"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg></div>
            <div class="check-label"><div class="text-sm font-medium text-gray-800 dark:text-gray-100">${r.name}</div>${r.note ? `<div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${r.note}</div>` : ""}${isUploaded ? '<div class="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Đã quét & nhận dạng ✓</div>' : ""}</div>
            <div class="flex items-center gap-2 flex-shrink-0">
                ${isUploadable ? `<button type="button" class="checklist-scan-btn" data-req-id="${r.id}" data-doc-type="${REQUIREMENT_DOC_TYPE_MAP[r.id]}" title="${isUploaded ? 'Quét lại' : 'Chụp / Tải lên'}"><svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/></svg></button>` : ""}
                ${showBadge ? '<span class="text-xs text-red-500 font-medium">Bắt buộc</span>' : ""}
            </div>
        </div>`;
    };

    const groups = ["cong_chung", "thue", "bien_dong"];
    const groupedReq = groups.map(g => ({ group: g, label: groupLabels[g], items: req.filter(r => r.group === g) })).filter(g => g.items.length > 0);
    const groupedOpt = opt.filter(r => r.group);

    el.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 mb-4" style="box-shadow: var(--shadow-xs)">
            <div class="flex items-center justify-between mb-3"><h3 class="font-semibold text-gray-800 dark:text-gray-100">Hồ sơ cần chuẩn bị</h3><span class="text-sm font-medium ${pct === 100 ? 'text-green-600' : 'text-gray-500 dark:text-gray-400'}">${done}/${req.length} bắt buộc</span></div>
            <div class="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2 mb-5"><div class="h-2 rounded-full transition-all ${pct === 100 ? 'bg-green-500' : 'bg-emerald-500'}" style="width:${pct}%"></div></div>
            ${groupedReq.map(g => {
                const groupDone = g.items.filter(r => cl[r.id]).length;
                return `
                <div class="mb-4">
                    <div class="check-group-header check-group-header--${g.group}">
                        ${groupIcons[g.group] || ''}
                        <span>${g.label}</span>
                        <span class="check-group-progress">${groupDone}/${g.items.length}</span>
                    </div>
                    <div class="space-y-2">${g.items.map(r => renderItem(r, true)).join("")}</div>
                </div>
            `; }).join("")}
            ${groupedOpt.length ? `<div class="border-t border-gray-100 pt-3 mt-3"><div class="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wide mb-2">Tùy trường hợp</div><div class="space-y-2">${groupedOpt.map(r => renderItem(r, false)).join("")}</div></div>` : ""}
        </div>
        ${pct === 100 ? `<div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><span class="text-2xl">✅</span><div><div class="font-semibold text-green-800 dark:text-green-300">Hồ sơ bắt buộc đã đủ!</div><div class="text-sm text-green-600 dark:text-green-400">Điền các biểu mẫu cần thiết.</div></div></div><button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-md" id="btn-to-f">Điền biểu mẫu →</button></div>` : ""}
    `;
    el.querySelectorAll(".check-item").forEach(item => {
        item.addEventListener("click", (e) => {
            if (e.target.closest(".checklist-scan-btn")) return;
            cl[item.dataset.check] = !cl[item.dataset.check];
            saveChecklist(currentProcId, cl);
            renderChecklist(el, p);
        });
    });
    el.querySelectorAll(".checklist-scan-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const reqId = btn.dataset.reqId;
            const docType = btn.dataset.docType;
            openScanModal("personal", reqId, docType);
        });
    });
    const toF = el.querySelector("#btn-to-f");
    if (toF) toF.addEventListener("click", () => { currentTab = "forms"; renderWorkflowTabs(); renderTabContent(); });
}

// --- TAB: FORMS ---
function renderFormCards(el) {
    if (!resolvedWF) return;
    const filled = loadFilledForms(currentProcId);
    const allFilled = resolvedWF.forms.every(fId => filled[fId]);

    el.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5 mb-4" style="box-shadow: var(--shadow-xs)">
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">Biểu mẫu cần điền</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">Hệ thống hỏi từng câu và tự động điền vào biểu mẫu cho bạn.</p>
            <div class="space-y-3">${resolvedWF.forms.map((fId, idx) => {
                const f = FORMS[fId]; const done = filled[fId];
                return `<button class="form-card-wf ${done ? 'filled' : ''}" data-fill="${fId}">
                    <div class="form-card-wf__index">${done ? '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/></svg>' : (idx + 1)}</div>
                    <div class="flex-1 min-w-0">
                        <div class="font-semibold text-gray-800 dark:text-gray-100 text-sm">${f.name}</div>
                        <div class="text-xs text-gray-500 dark:text-gray-400 mt-0.5">${f.title}</div>
                    </div>
                    <div class="flex items-center gap-2 flex-shrink-0">
                        ${done ? '<span class="text-xs text-green-600 dark:text-green-400 font-medium">Đã điền</span>' : '<span class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">Điền ngay</span>'}
                        <svg class="form-card-wf__arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </div>
                </button>`;
            }).join("")}</div>
        </div>
        ${allFilled ? `<div class="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-2xl p-4 flex items-center justify-between"><div class="flex items-center gap-3"><span class="text-2xl">✅</span><div><div class="font-semibold text-green-800 dark:text-green-300">Đã điền tất cả biểu mẫu!</div><div class="text-sm text-green-600 dark:text-green-400">Xem hướng dẫn nộp hồ sơ.</div></div></div><button class="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium transition-all hover:shadow-md" id="btn-to-st">Hướng dẫn nộp →</button></div>` : ""}
    `;
    el.querySelectorAll("[data-fill]").forEach(b => b.addEventListener("click", () => showQuestionnaireView(b.dataset.fill, true)));
    const toSt = el.querySelector("#btn-to-st");
    if (toSt) toSt.addEventListener("click", () => { currentTab = "steps"; renderWorkflowTabs(); renderTabContent(); });
}

// --- TAB: STEPS ---
function renderSteps(el) {
    if (!resolvedWF) return;
    el.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-5" style="box-shadow: var(--shadow-xs)">
            <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">Hướng dẫn thực hiện từng bước</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mb-5">Thực hiện theo thứ tự. Mỗi bước tương ứng một giai đoạn trong quy trình mua bán BĐS.</p>
            <div class="step-timeline">${resolvedWF.steps.map(s => `
                <div class="step-item"><div class="step-number">${s.order}</div><div class="step-card"><div class="step-title">${s.title}</div><div class="step-detail">${s.instruction}</div><div class="step-meta"><span>📍 ${s.location}</span><span>⏱ ${s.estimatedTime}</span></div>${s.tip ? `<div class="step-tip">💡 ${s.tip}</div>` : ""}</div></div>
            `).join("")}</div>
        </div>
    `;
}

// ================================================================
// QUESTIONNAIRE ENGINE
// ================================================================
function getVisibleQuestions() {
    return flatQuestions.filter(q => { if (!q.showIf) return true; return answers[q.showIf.field] === q.showIf.value; });
}

function renderQuestion() {
    const vis = getVisibleQuestions();
    if (currentQuestionIndex >= vis.length) currentQuestionIndex = vis.length - 1;
    if (currentQuestionIndex < 0) currentQuestionIndex = 0;
    const q = vis[currentQuestionIndex];
    const total = vis.length;
    $("#progress-bar").style.width = `${((currentQuestionIndex + 1) / total) * 100}%`;
    $("#progress-text").textContent = `${currentQuestionIndex + 1}/${total}`;
    $("#btn-prev").disabled = currentQuestionIndex === 0;
    const isLast = currentQuestionIndex === total - 1;
    $("#btn-next").classList.toggle("hidden", isLast);
    $("#btn-generate").classList.toggle("hidden", !isLast);
    const cv = answers[q.id] ?? "";
    let ih = "";
    switch (q.type) {
        case "text": case "tel": case "email": ih = `<input type="${q.type}" class="form-input" id="q-input" value="${escapeHtml(cv)}" placeholder="${q.placeholder || ""}">`; break;
        case "date": ih = `<input type="date" class="form-input" id="q-input" value="${cv}">`; break;
        case "textarea": ih = `<textarea class="form-input" id="q-input" placeholder="${q.placeholder || ""}" rows="4">${escapeHtml(cv)}</textarea>`; break;
        case "select": ih = `<select class="form-input form-select" id="q-input"><option value="">-- Chọn --</option>${q.options.map(o => `<option value="${o.value}" ${cv === o.value ? "selected" : ""}>${o.text}</option>`).join("")}</select>`; break;
        case "radio": ih = `<div class="option-group" id="q-input">${q.options.map(o => `<label class="option-label"><input type="radio" name="q-radio" value="${o.value}" ${cv === o.value ? "checked" : ""}><span>${o.text}</span></label>`).join("")}</div>`; break;
    }
    const af = autofilledFields.has(q.id) && cv;
    const badge = af ? `<span class="autofill-badge"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>Tự động</span>` : "";
    $("#question-area").innerHTML = `<div class="question-enter"><div class="text-xs font-medium text-emerald-600 uppercase tracking-wide mb-1">${q.sectionTitle}</div><label class="block text-gray-800 dark:text-gray-100 font-medium mb-1">${q.label} ${q.required === false ? '<span class="text-gray-400 dark:text-gray-500 font-normal text-sm">(không bắt buộc)</span>' : ""}${badge}</label>${q.hint ? `<p class="text-sm text-gray-400 dark:text-gray-500 mb-3">${q.hint}</p>` : '<div class="mb-3"></div>'}${ih}</div>`;
    const input = $("#q-input");
    if (input && input.tagName !== "DIV") { if (af) input.classList.add("is-autofilled"); input.focus(); input.addEventListener("keydown", e => { if (e.key === "Enter" && q.type !== "textarea") { e.preventDefault(); isLast ? generateForm() : nextQuestion(); } }); }
}

function saveCurrentAnswer() {
    const vis = getVisibleQuestions();
    const q = vis[currentQuestionIndex];
    const input = $("#q-input");
    if (!input) return;
    answers[q.id] = q.type === "radio" ? (input.querySelector("input:checked")?.value || "") : input.value;
}

function nextQuestion() { saveCurrentAnswer(); if (currentQuestionIndex < getVisibleQuestions().length - 1) { currentQuestionIndex++; renderQuestion(); } }
function prevQuestion() { saveCurrentAnswer(); if (currentQuestionIndex > 0) { currentQuestionIndex--; renderQuestion(); } }

function generateForm() {
    saveCurrentAnswer();
    updateProfileFromAnswers();
    if (currentProcId) markFormFilled(currentProcId, currentFormId);
    saveFormHistory(currentProcId, currentFormId, answers);
    $("#form-output").innerHTML = FORMS[currentFormId].render(answers);
    hideAll();
    viewPreview.classList.remove("hidden");
    showToast("Đã tạo biểu mẫu thành công!", "success");
}

function exportPDF() {
    if (typeof html2pdf === "undefined") {
        showToast("Thư viện xuất PDF chưa tải xong. Vui lòng thử lại sau vài giây.", "error");
        return;
    }

    const el = $("#form-output");
    if (!el || !el.innerHTML.trim()) return;

    const btn = $("#btn-export-pdf");
    const originalText = btn.innerHTML;
    btn.disabled = true;
    btn.innerHTML = `<svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Đang xuất...`;

    const form = FORMS[currentFormId];
    const filename = `${form ? form.name.replace(/[/\\]/g, "-") : "bieu-mau"}_${new Date().toISOString().slice(0, 10)}.pdf`;

    html2pdf().set({
        margin: [10, 10, 10, 10],
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    }).from(el).save().then(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        showToast("Đã xuất PDF thành công!", "success");
    }).catch(() => {
        btn.disabled = false;
        btn.innerHTML = originalText;
        showToast("Có lỗi khi xuất PDF. Vui lòng thử lại hoặc dùng nút In biểu mẫu.", "error");
    });
}

// ================================================================
// PROFILE UI
// ================================================================
const PROFILE_TAB_KEYS = {
    personal: ["name", "birthYear", "idType", "idNumber", "idIssuedDate", "idIssuedPlace", "address", "district", "province", "phone", "email", "taxCode"],
    party2: ["party2_name", "party2_birthYear", "party2_idNumber", "party2_idDate", "party2_idPlace", "party2_address", "party2_phone"],
    property: ["prop_address", "prop_parcelNumber", "prop_mapNumber", "prop_gcnNumber", "prop_gcnDate", "prop_landArea"],
};

function switchProfileTab(tabId) {
    currentProfileTab = tabId;
    document.querySelectorAll(".profile-tab-panel").forEach(p => p.classList.add("hidden"));
    const target = document.getElementById(`ptab-${tabId}`);
    if (target) target.classList.remove("hidden");
    document.querySelectorAll(".profile-tab").forEach(t => {
        t.classList.toggle("active", t.dataset.ptab === tabId);
    });
}

function updateProfileTabBadges() {
    const pr = loadProfile();
    for (const [tab, keys] of Object.entries(PROFILE_TAB_KEYS)) {
        const count = keys.filter(k => pr[k] && String(pr[k]).trim()).length;
        const el = document.getElementById(`ptab-count-${tab}`);
        if (el) el.textContent = count;
    }
}

function openProfileModal() {
    const pr = loadProfile();
    profileModal.querySelectorAll("[data-profile]").forEach(i => { i.value = pr[i.dataset.profile] || ""; });
    profileModal.classList.remove("hidden");
    requestAnimationFrame(() => profileModal.classList.add("is-open"));
    switchProfileTab("personal");
    updateProfileTabBadges();
}
function closeProfileModal() { profileModal.classList.remove("is-open"); setTimeout(() => profileModal.classList.add("hidden"), 300); }
function onSaveProfile() { const pr = {}; profileModal.querySelectorAll("[data-profile]").forEach(i => { if (i.value.trim()) pr[i.dataset.profile] = i.value.trim(); }); saveProfile(pr); closeProfileModal(); renderProfileBanner(); updateProfileTabBadges(); showToast("Đã lưu thông tin!", "success"); }
function onClearProfile() { localStorage.removeItem(PROFILE_KEY); profileModal.querySelectorAll("[data-profile]").forEach(i => { i.value = ""; }); renderProfileBanner(); updateProfileTabBadges(); showToast("Đã xóa thông tin", "info"); }

function renderProfileBanner() {
    const count = getProfileFieldCount();
    if (count > 0) {
        const name = loadProfile().name || "Người dùng";
        profileBanner.className = "mb-8 rounded-2xl border border-emerald-100 dark:border-emerald-800 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 p-4 flex items-center justify-between";
        profileBanner.innerHTML = `<div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg" style="box-shadow: 0 2px 8px rgba(6,95,70,0.25)">${name.charAt(0).toUpperCase()}</div><div><div class="font-semibold text-gray-800 dark:text-gray-100">${escapeHtml(name)}</div><div class="text-sm text-emerald-700 dark:text-emerald-400">${count} thông tin đã lưu — tự động điền khi chọn biểu mẫu</div></div></div><button class="text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium" id="banner-edit">Chỉnh sửa</button>`;
        $("#banner-edit").addEventListener("click", openProfileModal);
    } else {
        profileBanner.className = "mb-8 rounded-2xl border border-amber-200 dark:border-amber-800 bg-amber-50 dark:bg-amber-900/30 p-4 flex items-center justify-between";
        profileBanner.innerHTML = `<div class="flex items-center gap-3"><svg class="w-8 h-8 text-amber-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg><div><div class="font-semibold text-gray-800 dark:text-gray-100">Chưa lưu thông tin cá nhân</div><div class="text-sm text-amber-700 dark:text-amber-400">Lưu họ tên, CCCD, địa chỉ... để tự động điền cho mọi biểu mẫu</div></div></div><button class="text-sm text-emerald-600 hover:text-emerald-800 dark:text-emerald-400 dark:hover:text-emerald-300 font-medium whitespace-nowrap" id="banner-add">Thêm ngay</button>`;
        $("#banner-add").addEventListener("click", openProfileModal);
    }
}

// ================================================================
// DOCUMENT OCR SCANNER
// ================================================================
let scanTargetTab = null;
let scanImageFile = null;
let scanWorker = null;
let scanParsedData = null;
let scanRequirementId = null;

function loadUploadedDocs(procId) { try { return JSON.parse(localStorage.getItem(`udocs_${procId}`)) || {}; } catch { return {}; } }
function saveUploadedDocs(procId, data) { localStorage.setItem(`udocs_${procId}`, JSON.stringify(data)); }

const REQUIREMENT_DOC_TYPE_MAP = {
    gcn: "gcn",
    cmnd_ben_ban: "cccd", cmnd_ben_mua: "cccd", cmnd_vo_chong_ban: "cccd",
    cmnd_ben_tang: "cccd", cmnd_ben_nhan: "cccd", cmnd_vo_chong: "cccd",
    cmnd: "cccd",
    hon_nhan_ban: "honnhan", hon_nhan_mua: "honnhan", hon_nhan_tang: "honnhan", hon_nhan: "honnhan",
    dang_ky_ket_hon: "kethon",
    ho_khau_ben_ban: "hokhau", ho_khau: "hokhau", so_ho_khau: "hokhau",
    xac_nhan_cu_tru: "hokhau",
    gpkd: "gpkd",
    uy_quyen: "other",
    giay_mien_thue: "other",
};

const MANUAL_INTAKE_FIELDS = {
    mua_ban_bds: ["propertyType"],
    tang_cho_bds: ["relationship"],
    thua_ke_bds: ["inheritType", "relationship"],
    the_chap_bds: ["propertyType", "loanPurpose"],
    xoa_the_chap: [],
    tach_thua_dat: ["splitOrMerge"],
    cap_gcn_lan_dau: [],
    chuyen_muc_dich_sdd: [],
    cho_thue_bds: ["declarationType"],
};

function parseKetHon(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};
    const nameMatch = t.match(/(?:[OÔ]ng|Anh)[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|,|v[aà])/i);
    if (nameMatch) { result.spouse1 = nameMatch[1].trim().toUpperCase(); confidence.spouse1 = "medium"; }
    const name2Match = t.match(/(?:B[aà]|Ch[iị])[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|,|$)/i);
    if (name2Match) { result.spouse2 = name2Match[1].trim().toUpperCase(); confidence.spouse2 = "medium"; }
    const dateMatch = t.match(/(?:ng[aà]y\s*(?:đ[aă]ng\s*k[yý]|k[eế]t\s*h[oô]n))[:\s,]*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/i);
    if (dateMatch) { result.marriageDate = parseDateVN(dateMatch[1]); if (result.marriageDate) confidence.marriageDate = "medium"; }
    result._docType = "kethon";
    result._maritalStatus = "married";
    result._confidence = confidence;
    return result;
}

function parseHonNhan(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};
    const nameMatch = t.match(/(?:H[oọ]\s*(?:v[aà]\s*)?t[eê]n|[OÔ]ng|B[aà])[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|,|$)/i);
    if (nameMatch) { result.name = nameMatch[1].trim().toUpperCase(); confidence.name = "medium"; }
    const singleMatch = t.match(/(?:ch[uư]a\s*(?:đ[aă]ng\s*k[yý]\s*)?k[eế]t\s*h[oô]n|độc\s*th[aâ]n|single)/i);
    const marriedMatch = t.match(/(?:đ[aã]\s*(?:đ[aă]ng\s*k[yý]\s*)?k[eế]t\s*h[oô]n|có\s*(?:vợ|ch[oồ]ng)|married)/i);
    if (singleMatch) { result._maritalStatus = "single"; confidence._maritalStatus = "high"; }
    else if (marriedMatch) { result._maritalStatus = "married"; confidence._maritalStatus = "high"; }
    result._docType = "honnhan";
    result._confidence = confidence;
    return result;
}

function parseHoKhau(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};
    const addrMatch = t.match(/(?:đ[iị]a\s*ch[iỉ]|th[uư][oờ]ng\s*tr[uú]|nơi\s*đ[aă]ng\s*k[yý])[:\s]*(.+?)(?:\n|$)/i);
    if (addrMatch) { result.address = addrMatch[1].trim(); confidence.address = "medium"; }
    const nameMatch = t.match(/(?:ch[uủ]\s*h[oộ]|H[oọ]\s*(?:v[aà]\s*)?t[eê]n)[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|,|$)/i);
    if (nameMatch) { result.name = nameMatch[1].trim().toUpperCase(); confidence.name = "medium"; }
    const provinceMatch = t.match(/(?:t[iỉ]nh|th[aà]nh\s*ph[oố]|TP\.?)[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s\.]+?)(?:\n|,|$)/i);
    if (provinceMatch) { result.province = provinceMatch[1].trim(); confidence.province = "low"; }
    result._docType = "hokhau";
    result._confidence = confidence;
    return result;
}

function inferIntakeFromDocuments(procedure, docs) {
    const inferred = {};
    const reasons = {};

    for (const [reqId, docData] of Object.entries(docs)) {
        if (!docData || !docData.ocrData) continue;
        const ocr = docData.ocrData;

        if (reqId === "dang_ky_ket_hon" || ocr._docType === "kethon") {
            inferred.sellerMarital = "married";
            inferred.borrowerMarital = "married";
            inferred.ownerMarital = "married";
            reasons.sellerMarital = "từ Giấy đăng ký kết hôn";
        }
        if (reqId === "hon_nhan_ban" || reqId === "hon_nhan" || ocr._docType === "honnhan") {
            if (ocr._maritalStatus === "single") {
                inferred.sellerMarital = "single";
                reasons.sellerMarital = "từ Giấy xác nhận hôn nhân";
            } else if (ocr._maritalStatus === "married") {
                inferred.sellerMarital = "married";
                reasons.sellerMarital = "từ Giấy xác nhận hôn nhân";
            }
        }
        if (reqId === "cmnd_vo_chong_ban" || reqId === "cmnd_vo_chong") {
            inferred.assetType = "shared";
            reasons.assetType = "từ CCCD vợ/chồng";
        }
        if (reqId === "gpkd") {
            inferred.buyerType = "to_chuc";
            reasons.buyerType = "từ Giấy phép kinh doanh";
        }
        if (reqId === "uy_quyen") {
            inferred.hasProxy = "yes";
            reasons.hasProxy = "từ Giấy ủy quyền";
        }
    }

    if (!inferred.buyerType && (docs.cmnd_ben_mua || docs.cmnd_ben_nhan)) {
        inferred.buyerType = "ca_nhan";
        reasons.buyerType = "từ CCCD bên mua";
    }

    if (!inferred.hasProxy) {
        inferred.hasProxy = "no";
    }

    const buyerAddr = docs.cmnd_ben_mua?.ocrData?.address || docs.cmnd_ben_nhan?.ocrData?.address || "";
    const propAddr = docs.gcn?.ocrData?.address || "";
    if (buyerAddr && propAddr) {
        const sameP = fuzzyProvinceMatch(buyerAddr, propAddr);
        inferred.sameProvince = sameP ? "yes" : "no";
        reasons.sameProvince = "so sánh địa chỉ CCCD và GCN";
    }

    inferred._reasons = reasons;
    return inferred;
}

function fuzzyProvinceMatch(addr1, addr2) {
    const normalize = s => s.toLowerCase()
        .replace(/tp\.?\s*/g, "thành phố ")
        .replace(/t\.\s*/g, "tỉnh ")
        .replace(/\s+/g, " ").trim();
    const provinces = ["hà nội", "hồ chí minh", "đà nẵng", "hải phòng", "cần thơ",
        "bình dương", "đồng nai", "long an", "bà rịa", "khánh hòa", "quảng ninh",
        "thanh hóa", "nghệ an", "hà tĩnh", "thừa thiên", "quảng nam", "bình định",
        "lâm đồng", "bắc ninh", "hải dương", "hưng yên", "vĩnh phúc", "thái nguyên"];
    const a1 = normalize(addr1);
    const a2 = normalize(addr2);
    for (const p of provinces) {
        const in1 = a1.includes(p);
        const in2 = a2.includes(p);
        if (in1 && in2) return true;
        if (in1 || in2) return false;
    }
    return false;
}

const SCAN_DOC_TYPES = {
    cccd: { label: "CCCD / CMND", parser: "parseCCCD", fields: [
        { key: "name", label: "Họ và tên", profileKey: { personal: "name", party2: "party2_name" } },
        { key: "idNumber", label: "Số CCCD/CMND", profileKey: { personal: "idNumber", party2: "party2_idNumber" } },
        { key: "birthYear", label: "Năm sinh", profileKey: { personal: "birthYear", party2: "party2_birthYear" } },
        { key: "address", label: "Nơi thường trú", profileKey: { personal: "address", party2: "party2_address" } },
        { key: "idIssuedDate", label: "Ngày cấp", inputType: "date", profileKey: { personal: "idIssuedDate", party2: "party2_idDate" } },
        { key: "idIssuedPlace", label: "Nơi cấp", profileKey: { personal: "idIssuedPlace", party2: "party2_idPlace" } },
    ]},
    passport: { label: "Hộ chiếu", parser: "parsePassport", fields: [
        { key: "name", label: "Họ và tên", profileKey: { personal: "name", party2: "party2_name" } },
        { key: "idNumber", label: "Số hộ chiếu", profileKey: { personal: "idNumber", party2: "party2_idNumber" } },
        { key: "birthYear", label: "Năm sinh", profileKey: { personal: "birthYear", party2: "party2_birthYear" } },
        { key: "idIssuedDate", label: "Ngày cấp", inputType: "date", profileKey: { personal: "idIssuedDate", party2: "party2_idDate" } },
        { key: "idIssuedPlace", label: "Nơi cấp", profileKey: { personal: "idIssuedPlace", party2: "party2_idPlace" } },
    ]},
    gcn: { label: "GCN Quyền sử dụng đất", parser: "parseGCN", fields: [
        { key: "gcnNumber", label: "Số GCN", profileKey: { property: "prop_gcnNumber" } },
        { key: "parcelNumber", label: "Thửa đất số", profileKey: { property: "prop_parcelNumber" } },
        { key: "mapNumber", label: "Tờ bản đồ số", profileKey: { property: "prop_mapNumber" } },
        { key: "landArea", label: "Diện tích (m²)", profileKey: { property: "prop_landArea" } },
        { key: "address", label: "Địa chỉ BĐS", profileKey: { property: "prop_address" } },
        { key: "ownerName", label: "Chủ sử dụng", profileKey: { personal: "name" } },
    ]},
    gpkd: { label: "Giấy phép kinh doanh", parser: "parseGPKD", fields: [
        { key: "name", label: "Tên doanh nghiệp / cá nhân", profileKey: { personal: "name" } },
        { key: "taxCode", label: "Mã số thuế", profileKey: { personal: "taxCode" } },
        { key: "address", label: "Địa chỉ", profileKey: { personal: "address" } },
        { key: "phone", label: "Điện thoại", profileKey: { personal: "phone" } },
    ]},
    hokhau: { label: "Sổ hộ khẩu", parser: "parseHoKhau", fields: [
        { key: "name", label: "Chủ hộ", profileKey: { personal: "name", party2: "party2_name" } },
        { key: "address", label: "Địa chỉ thường trú", profileKey: { personal: "address", party2: "party2_address" } },
        { key: "province", label: "Tỉnh/Thành phố", profileKey: { personal: "province" } },
    ]},
    kethon: { label: "Giấy đăng ký kết hôn", parser: "parseKetHon", fields: [
        { key: "spouse1", label: "Ông/Anh" },
        { key: "spouse2", label: "Bà/Chị" },
        { key: "marriageDate", label: "Ngày đăng ký", inputType: "date" },
    ]},
    honnhan: { label: "Giấy xác nhận tình trạng hôn nhân", parser: "parseHonNhan", fields: [
        { key: "name", label: "Họ và tên", profileKey: { personal: "name", party2: "party2_name" } },
    ]},
    other: { label: "Giấy tờ khác", parser: "parseGeneric", fields: "generic" },
};

const GENERIC_FIELDS = [
    { key: "name", label: "Họ và tên", profileKey: { personal: "name", party2: "party2_name" } },
    { key: "idNumber", label: "Số CCCD/CMND", profileKey: { personal: "idNumber", party2: "party2_idNumber" } },
    { key: "birthYear", label: "Năm sinh", profileKey: { personal: "birthYear", party2: "party2_birthYear" } },
    { key: "address", label: "Địa chỉ", profileKey: { personal: "address", party2: "party2_address" } },
    { key: "phone", label: "Điện thoại", profileKey: { personal: "phone", party2: "party2_phone" } },
    { key: "taxCode", label: "Mã số thuế", profileKey: { personal: "taxCode" } },
    { key: "date1", label: "Ngày (tìm thấy)", inputType: "date" },
    { key: "rawText", label: "Nội dung nhận dạng (thô)", inputType: "textarea" },
];

async function getOcrWorker() {
    if (scanWorker) return scanWorker;
    const worker = await Tesseract.createWorker("vie+eng", 1, {
        logger: m => {
            if (m.status === "recognizing text") {
                const pct = Math.round(m.progress * 100);
                const bar = $("#scan-progress-bar");
                const pctEl = $("#scan-progress-pct");
                const textEl = $("#scan-progress-text");
                if (bar) bar.style.width = pct + "%";
                if (pctEl) pctEl.textContent = pct + "%";
                if (textEl) textEl.textContent = "Đang nhận dạng văn bản...";
            } else if (m.status === "loading language traineddata") {
                const sub = $("#scan-progress-sub");
                if (sub) sub.textContent = "Đang tải dữ liệu ngôn ngữ tiếng Việt (chỉ cần 1 lần)...";
            }
        }
    });
    scanWorker = worker;
    return worker;
}

function preprocessImage(file) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const maxW = 2000;
            const scale = img.width > maxW ? maxW / img.width : 1;
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;
            for (let i = 0; i < data.length; i += 4) {
                const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
                const contrast = ((gray - 128) * 1.3) + 128;
                const val = Math.max(0, Math.min(255, contrast));
                data[i] = data[i + 1] = data[i + 2] = val;
            }
            ctx.putImageData(imageData, 0, 0);
            canvas.toBlob(blob => resolve(blob), "image/png");
            URL.revokeObjectURL(img.src);
        };
        img.src = URL.createObjectURL(file);
    });
}

function normalizeVietnamese(text) {
    return text
        .replace(/[''`]/g, "'")
        .replace(/[""]/g, '"')
        .replace(/\s+/g, " ")
        .trim();
}

function parseDateVN(str) {
    if (!str) return null;
    const m = str.match(/(\d{1,2})\s*[/.\-]\s*(\d{1,2})\s*[/.\-]\s*(\d{4})/);
    if (m) {
        const d = m[1].padStart(2, "0");
        const mo = m[2].padStart(2, "0");
        return `${m[3]}-${mo}-${d}`;
    }
    return null;
}

function parseCCCD(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};

    const idMatch = t.match(/(?:S[oố]|No\.?)[:\s.]*(\d{9,12})/i) || t.match(/(\d{12})/);
    if (idMatch) { result.idNumber = idMatch[1]; confidence.idNumber = "high"; }

    const nameMatch = t.match(/(?:H[oọ]\s*(?:v[aà]\s*)?t[eê]n|Full\s*name)[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|$)/i);
    if (nameMatch) {
        result.name = nameMatch[1].trim().toUpperCase();
        confidence.name = result.name.length > 2 ? "high" : "low";
    }

    const dobMatch = t.match(/(?:Ng[aà]y\s*(?:,?\s*th[aá]ng\s*,?\s*n[aă]m)?\s*sinh|Date\s*of\s*birth)[:\s,]*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/i);
    if (dobMatch) {
        const parsed = parseDateVN(dobMatch[1]);
        if (parsed) {
            result.birthYear = parsed.substring(0, 4);
            confidence.birthYear = "high";
        }
    }

    const addrMatch = t.match(/(?:N[oơ]i\s*th[uư][oờ]ng\s*tr[uú]|Place\s*of\s*residence)[:\s]*(.+?)(?:\n|$)/i);
    if (addrMatch) {
        result.address = addrMatch[1].trim();
        confidence.address = result.address.length > 5 ? "high" : "low";
    }

    const issueDateMatch = t.match(/(?:Ng[aà]y\s*c[aấ]p|Date\s*of\s*issue)[:\s,]*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/i);
    if (issueDateMatch) {
        result.idIssuedDate = parseDateVN(issueDateMatch[1]);
        if (result.idIssuedDate) confidence.idIssuedDate = "high";
    }

    const placeMatch = t.match(/(?:C[uụ]c\s*(?:CS\s*)?(?:QLHC|qu[aả]n\s*l[yý]).*|(?:C[oô]ng\s*an|CA)\s*(?:t[iỉ]nh|TP|th[aà]nh\s*ph[oố]).*)/i);
    if (placeMatch) {
        result.idIssuedPlace = placeMatch[0].trim();
        confidence.idIssuedPlace = "medium";
    }

    result._confidence = confidence;
    return result;
}

function parsePassport(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};

    const mrzMatch = t.match(/P<VNM([A-Z<]+)<<([A-Z<]+)/);
    if (mrzMatch) {
        const surname = mrzMatch[1].replace(/</g, " ").trim();
        const given = mrzMatch[2].replace(/</g, " ").trim();
        result.name = (surname + " " + given).trim();
        confidence.name = "high";
    }

    const passMatch = t.match(/(?:S[oố]\s*(?:h[oộ]\s*chi[eế]u|HC)|Passport\s*No\.?)[:\s.]*([A-Z]\d{7,8})/i);
    if (passMatch) { result.idNumber = passMatch[1]; confidence.idNumber = "high"; }

    if (!result.name) {
        const nameMatch = t.match(/(?:H[oọ]\s*(?:v[aà]\s*)?t[eê]n|Surname|Given\s*name)[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|$)/i);
        if (nameMatch) { result.name = nameMatch[1].trim().toUpperCase(); confidence.name = "medium"; }
    }

    const dobMatch = t.match(/(?:Ng[aà]y\s*sinh|Date\s*of\s*birth)[:\s,]*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/i);
    if (dobMatch) {
        const parsed = parseDateVN(dobMatch[1]);
        if (parsed) { result.birthYear = parsed.substring(0, 4); confidence.birthYear = "high"; }
    }

    const issueDateMatch = t.match(/(?:Ng[aà]y\s*c[aấ]p|Date\s*of\s*issue)[:\s,]*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/i);
    if (issueDateMatch) {
        result.idIssuedDate = parseDateVN(issueDateMatch[1]);
        if (result.idIssuedDate) confidence.idIssuedDate = "high";
    }

    const placeMatch = t.match(/(?:N[oơ]i\s*c[aấ]p|Place\s*of\s*issue)[:\s]*(.+?)(?:\n|$)/i);
    if (placeMatch) { result.idIssuedPlace = placeMatch[1].trim(); confidence.idIssuedPlace = "medium"; }

    result._confidence = confidence;
    return result;
}

function parseGCN(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};

    const gcnMatch = t.match(/(?:S[oố]\s*(?:v[aà]o\s*s[oổ]|GCN|ph[aá]t\s*h[aà]nh))[:\s]*([A-ZĐ]{1,3}\s*\d{4,8})/i);
    if (gcnMatch) { result.gcnNumber = gcnMatch[1].trim(); confidence.gcnNumber = "high"; }

    const parcelMatch = t.match(/(?:Th[uử]a\s*(?:đ[aấ]t\s*)?s[oố]|Th[uư][aả]\s*s[oố])[:\s]*(\d+)/i);
    if (parcelMatch) { result.parcelNumber = parcelMatch[1]; confidence.parcelNumber = "high"; }

    const mapMatch = t.match(/(?:T[oờ]\s*(?:b[aả]n\s*đ[oồ]\s*)?s[oố])[:\s]*(\d+)/i);
    if (mapMatch) { result.mapNumber = mapMatch[1]; confidence.mapNumber = "high"; }

    const areaMatch = t.match(/(?:Di[eệ]n\s*t[ií]ch)[:\s]*(\d+[.,]?\d*)\s*m/i) || t.match(/(\d+[.,]?\d*)\s*m[²2]/);
    if (areaMatch) { result.landArea = areaMatch[1].replace(",", "."); confidence.landArea = "high"; }

    const addrMatch = t.match(/(?:T[aạ]i|Đ[iị]a\s*ch[iỉ])[:\s]*(.+?)(?:\n|$)/i);
    if (addrMatch) { result.address = addrMatch[1].trim(); confidence.address = result.address.length > 5 ? "high" : "low"; }

    const ownerMatch = t.match(/(?:Ng[uư][oờ]i\s*s[uử]\s*d[uụ]ng|Ch[uủ]\s*s[oở]\s*h[uữ]u|H[oọ]\s*(?:v[aà]\s*)?t[eê]n)[:\s]*([A-ZÀ-Ỹa-zà-ỹ\s]+?)(?:\n|$)/i);
    if (ownerMatch) { result.ownerName = ownerMatch[1].trim().toUpperCase(); confidence.ownerName = "medium"; }

    result._confidence = confidence;
    return result;
}

function parseGPKD(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};

    const nameMatch = t.match(/(?:T[eê]n\s*(?:doanh\s*nghi[eệ]p|c[oơ]\s*s[oở]|c[aá]\s*nh[aâ]n)|H[oọ]\s*(?:v[aà]\s*)?t[eê]n)[:\s]*(.+?)(?:\n|$)/i);
    if (nameMatch) { result.name = nameMatch[1].trim(); confidence.name = "high"; }

    const taxMatch = t.match(/(?:M[aã]\s*s[oố]\s*(?:thu[eế]|DN)|MST)[:\s]*(\d[\d\s\-]{8,14})/i);
    if (taxMatch) { result.taxCode = taxMatch[1].replace(/[\s\-]/g, ""); confidence.taxCode = "high"; }

    const addrMatch = t.match(/(?:Đ[iị]a\s*ch[iỉ]|Tr[uụ]\s*s[oở])[:\s]*(.+?)(?:\n|$)/i);
    if (addrMatch) { result.address = addrMatch[1].trim(); confidence.address = "medium"; }

    const phoneMatch = t.match(/(?:Đi[eệ]n\s*tho[aạ]i|ĐT|Tel)[:\s]*(0\d[\d\s\.\-]{7,12})/i);
    if (phoneMatch) { result.phone = phoneMatch[1].replace(/[\s\.\-]/g, ""); confidence.phone = "high"; }

    result._confidence = confidence;
    return result;
}

function parseGeneric(text) {
    const t = normalizeVietnamese(text);
    const result = {};
    const confidence = {};

    const idMatch = t.match(/(\d{12})/) || t.match(/(\d{9})/);
    if (idMatch) { result.idNumber = idMatch[1]; confidence.idNumber = "low"; }

    const nameMatch = t.match(/(?:H[oọ]\s*(?:v[aà]\s*)?t[eê]n|[OÔ]ng|B[aà])[:\s]*([A-ZÀ-Ỹ][A-ZÀ-Ỹa-zà-ỹ\s]{2,40})(?:\n|,|$)/i);
    if (nameMatch) { result.name = nameMatch[1].trim().toUpperCase(); confidence.name = "medium"; }

    const dobMatch = t.match(/(?:sinh\s*(?:ng[aà]y)?|n[aă]m\s*sinh)[:\s,]*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/i);
    if (dobMatch) {
        const parsed = parseDateVN(dobMatch[1]);
        if (parsed) { result.birthYear = parsed.substring(0, 4); confidence.birthYear = "medium"; }
    }

    const addrMatch = t.match(/(?:đ[iị]a\s*ch[iỉ]|th[uư][oờ]ng\s*tr[uú]|nơi\s*[oở])[:\s]*(.+?)(?:\n|$)/i);
    if (addrMatch) { result.address = addrMatch[1].trim(); confidence.address = "low"; }

    const phoneMatch = t.match(/(0\d{9,10})/);
    if (phoneMatch) { result.phone = phoneMatch[1]; confidence.phone = "medium"; }

    const taxMatch = t.match(/(?:MST|m[aã]\s*s[oố]\s*thu[eế])[:\s]*(\d{10,13})/i);
    if (taxMatch) { result.taxCode = taxMatch[1]; confidence.taxCode = "medium"; }

    const dateMatch = t.match(/(?:ng[aà]y|Ng[aà]y)\s*(\d{1,2}\s*[/.\-]\s*\d{1,2}\s*[/.\-]\s*\d{4})/);
    if (dateMatch) {
        result.date1 = parseDateVN(dateMatch[1]);
        if (result.date1) confidence.date1 = "low";
    }

    result.rawText = text.trim();
    confidence.rawText = "high";

    result._confidence = confidence;
    return result;
}

const DOC_PARSERS = { parseCCCD, parsePassport, parseGCN, parseGPKD, parseGeneric, parseKetHon, parseHonNhan, parseHoKhau };

function getScanFields(docType) {
    const dt = SCAN_DOC_TYPES[docType];
    if (!dt) return GENERIC_FIELDS;
    return dt.fields === "generic" ? GENERIC_FIELDS : dt.fields;
}

function mapScanToProfile(docType, data, targetTab) {
    const fields = getScanFields(docType);
    const mapping = {};
    for (const f of fields) {
        if (!data[f.key] || !f.profileKey) continue;
        const pk = f.profileKey[targetTab] || f.profileKey.personal || f.profileKey.property;
        if (pk) mapping[pk] = data[f.key];
    }
    return mapping;
}

function openScanModal(targetTab, requirementId, docType) {
    if (typeof Tesseract === "undefined") {
        showToast("Thư viện nhận dạng chưa tải xong. Vui lòng thử lại.", "error");
        return;
    }
    scanTargetTab = targetTab;
    scanRequirementId = requirementId || null;
    scanImageFile = null;
    scanParsedData = null;

    const modal = $("#scan-modal");
    modal.classList.remove("hidden");
    showScanStep("capture");

    const docSelect = $("#scan-doc-type");
    if (docType && SCAN_DOC_TYPES[docType]) {
        docSelect.value = docType;
        docSelect.closest(".scan-doc-section").classList.toggle("hidden", !!requirementId);
    } else if (targetTab === "property") {
        docSelect.value = "gcn";
        docSelect.closest(".scan-doc-section").classList.remove("hidden");
    } else {
        docSelect.value = "cccd";
        docSelect.closest(".scan-doc-section").classList.remove("hidden");
    }
}

function closeScanModal() {
    const modal = $("#scan-modal");
    modal.classList.add("hidden");
    scanImageFile = null;
    scanParsedData = null;
    scanRequirementId = null;
    const camera = $("#scan-input-camera");
    const gallery = $("#scan-input-gallery");
    if (camera) camera.value = "";
    if (gallery) gallery.value = "";
    const docSection = $(".scan-doc-section");
    if (docSection) docSection.classList.remove("hidden");
}

function showScanStep(stepId) {
    document.querySelectorAll(".scan-step").forEach(s => s.classList.add("hidden"));
    const target = $(`#scan-step-${stepId}`);
    if (target) target.classList.remove("hidden");
}

function onScanImageSelected(file) {
    if (!file || !file.type.startsWith("image/")) return;
    scanImageFile = file;
    const preview = $("#scan-preview-img");
    if (preview) {
        const url = URL.createObjectURL(file);
        preview.onload = () => URL.revokeObjectURL(url);
        preview.src = url;
    }
    showScanStep("preview");
}

async function onStartOcr() {
    if (!scanImageFile) return;
    showScanStep("processing");

    const bar = $("#scan-progress-bar");
    const pctEl = $("#scan-progress-pct");
    const textEl = $("#scan-progress-text");
    const subEl = $("#scan-progress-sub");
    if (bar) bar.style.width = "0%";
    if (pctEl) pctEl.textContent = "0%";
    if (textEl) textEl.textContent = "Đang xử lý ảnh...";
    if (subEl) subEl.textContent = "";

    try {
        const processed = await preprocessImage(scanImageFile);
        if (textEl) textEl.textContent = "Đang nhận dạng văn bản...";

        const worker = await getOcrWorker();
        const { data } = await worker.recognize(processed);
        const rawText = data.text || "";

        const docType = $("#scan-doc-type").value;
        const parserName = SCAN_DOC_TYPES[docType]?.parser || "parseGeneric";
        const parser = DOC_PARSERS[parserName] || parseGeneric;
        scanParsedData = parser(rawText);

        renderScanReview(docType);
    } catch (err) {
        showScanStep("review");
        const fields = $("#scan-review-fields");
        if (fields) fields.innerHTML = "";
        const empty = $("#scan-review-empty");
        if (empty) empty.classList.remove("hidden");
        const applyBtn = $("#btn-scan-apply");
        if (applyBtn) applyBtn.disabled = true;
    }
}

function renderScanReview(docType) {
    showScanStep("review");
    const container = $("#scan-review-fields");
    const emptyEl = $("#scan-review-empty");
    const applyBtn = $("#btn-scan-apply");

    if (!scanParsedData || Object.keys(scanParsedData).filter(k => k !== "_confidence" && k !== "rawText").length === 0) {
        if (container) container.innerHTML = "";
        if (emptyEl) emptyEl.classList.remove("hidden");
        if (applyBtn) applyBtn.disabled = true;
        return;
    }

    if (emptyEl) emptyEl.classList.add("hidden");
    if (applyBtn) applyBtn.disabled = false;

    const fields = getScanFields(docType);
    const conf = scanParsedData._confidence || {};
    let html = "";

    for (const f of fields) {
        const val = scanParsedData[f.key] || "";
        if (!val && f.key !== "rawText") continue;
        const isLow = conf[f.key] === "low" || conf[f.key] === "medium";
        const lowClass = isLow ? "scan-review-field--low" : "";
        const tag = f.key === "rawText" ? "textarea" : "input";
        const inputType = f.inputType || "text";

        if (f.key === "rawText") {
            html += `<div class="scan-review-field ${lowClass}">
                <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">${f.label}</label>
                <textarea class="form-input text-xs" data-scan-key="${f.key}" rows="4" readonly>${escapeHtml(val)}</textarea>
            </div>`;
        } else {
            html += `<div class="scan-review-field ${lowClass}">
                <label class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    ${f.label}
                    ${isLow ? '<span class="text-amber-500 text-xs ml-1">(kiểm tra lại)</span>' : '<span class="text-emerald-500 text-xs ml-1">✓</span>'}
                </label>
                <input type="${inputType}" class="form-input" data-scan-key="${f.key}" value="${escapeHtml(val)}">
            </div>`;
        }
    }

    if (container) container.innerHTML = html;
}

function onApplyScanResults() {
    const reviewFields = document.querySelectorAll("#scan-review-fields [data-scan-key]");
    const data = {};
    reviewFields.forEach(el => {
        const key = el.dataset.scanKey;
        const val = (el.value || "").trim();
        if (val && key !== "rawText") data[key] = val;
    });

    if (Object.keys(data).length === 0) {
        showToast("Không có thông tin để áp dụng.", "info");
        closeScanModal();
        return;
    }

    const docType = $("#scan-doc-type").value;
    const reqId = scanRequirementId;

    const mapping = mapScanToProfile(docType, data, scanTargetTab);
    const pr = loadProfile();
    let filledCount = 0;
    for (const [profileKey, value] of Object.entries(mapping)) {
        if (value) {
            pr[profileKey] = value;
            filledCount++;
        }
    }
    saveProfile(pr);

    const profileModalEl = $("#profile-modal");
    if (profileModalEl && !profileModalEl.classList.contains("hidden")) {
        for (const [profileKey, value] of Object.entries(mapping)) {
            const input = profileModalEl.querySelector(`[data-profile="${profileKey}"]`);
            if (input && value) {
                input.value = value;
                input.classList.add("is-autofilled");
            }
        }
        updateProfileTabBadges();
    }

    if (reqId && currentProcId) {
        uploadedDocuments[reqId] = { ocrData: { ...data, ...scanParsedData }, docType, timestamp: Date.now() };
        saveUploadedDocs(currentProcId, uploadedDocuments);

        const cl = loadChecklist(currentProcId);
        cl[reqId] = true;
        saveChecklist(currentProcId, cl);

        const p = PROCEDURES[currentProcId];
        const inferred = inferIntakeFromDocuments(p, uploadedDocuments);
        const reasons = inferred._reasons || {};
        delete inferred._reasons;
        let inferredChanges = [];
        for (const [k, v] of Object.entries(inferred)) {
            if (!intakeContext[k] || intakeContext["_auto_" + k]) {
                if (intakeContext[k] !== v) {
                    const q = p.intake.find(iq => iq.id === k);
                    const opt = q?.options.find(o => o.value === v);
                    if (opt) inferredChanges.push(opt.label);
                }
                intakeContext[k] = v;
                intakeContext["_auto_" + k] = true;
            }
        }
        saveIntakeContext(currentProcId, intakeContext);

        if (isIntakeComplete(p, intakeContext)) {
            resolvedWF = resolveWorkflow(p, intakeContext);
        }
        renderWorkflowTabs();
        renderTabContent();
        renderProfileBanner();

        const docLabel = SCAN_DOC_TYPES[docType]?.label || "giấy tờ";
        const inferText = inferredChanges.length > 0 ? ` Phát hiện: ${inferredChanges.join(", ")}` : "";
        closeScanModal();
        showToast(`Đã nhận dạng ${docLabel}. ${filledCount} trường đã lưu.${inferText}`, "success");
    } else {
        closeScanModal();
        renderProfileBanner();
        const docLabel = SCAN_DOC_TYPES[docType]?.label || "giấy tờ";
        if (filledCount > 0) {
            showToast(`Đã lưu ${filledCount} thông tin từ ${docLabel}`, "success");
        } else {
            showToast("Không tìm thấy trường phù hợp để điền.", "info");
        }
        updateProfileTabBadges();
    }
}

function initDocScanner() {
    document.querySelectorAll(".scan-doc-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const tab = btn.dataset.scanTab;
            if (tab) openScanModal(tab);
        });
    });

    const scanOverlay = $("#scan-overlay");
    if (scanOverlay) scanOverlay.addEventListener("click", closeScanModal);

    document.querySelectorAll(".scan-close-btn").forEach(btn => {
        btn.addEventListener("click", closeScanModal);
    });

    const cameraInput = $("#scan-input-camera");
    const galleryInput = $("#scan-input-gallery");
    if (cameraInput) cameraInput.addEventListener("change", (e) => {
        if (e.target.files[0]) onScanImageSelected(e.target.files[0]);
    });
    if (galleryInput) galleryInput.addEventListener("change", (e) => {
        if (e.target.files[0]) onScanImageSelected(e.target.files[0]);
    });

    const retakeBtn = $("#btn-scan-retake");
    if (retakeBtn) retakeBtn.addEventListener("click", () => {
        scanImageFile = null;
        showScanStep("capture");
        const camera = $("#scan-input-camera");
        const gallery = $("#scan-input-gallery");
        if (camera) camera.value = "";
        if (gallery) gallery.value = "";
    });

    const startBtn = $("#btn-scan-start");
    if (startBtn) startBtn.addEventListener("click", onStartOcr);

    const retryBtn = $("#btn-scan-retry");
    if (retryBtn) retryBtn.addEventListener("click", () => {
        scanImageFile = null;
        scanParsedData = null;
        showScanStep("capture");
        const camera = $("#scan-input-camera");
        const gallery = $("#scan-input-gallery");
        if (camera) camera.value = "";
        if (gallery) gallery.value = "";
    });

    const applyBtn = $("#btn-scan-apply");
    if (applyBtn) applyBtn.addEventListener("click", onApplyScanResults);
}

// ================================================================
// COST CALCULATOR
// ================================================================
const CONG_CHUNG_TIERS = [
    { max: 50_000_000, rate: 0.005, label: "50 triệu" },
    { max: 100_000_000, rate: 0.001, label: "100 triệu" },
    { max: 1_000_000_000, rate: 0.0005, label: "1 tỷ" },
    { max: 3_000_000_000, rate: 0.0003, label: "3 tỷ" },
    { max: 5_000_000_000, rate: 0.0002, label: "5 tỷ" },
    { max: 10_000_000_000, rate: 0.0001, label: "10 tỷ" },
    { max: Infinity, rate: 0.00005, label: "trên 10 tỷ" },
];

function calcCongChungFee(value) {
    let fee = 0;
    let prev = 0;
    for (const tier of CONG_CHUNG_TIERS) {
        const chunk = Math.min(value, tier.max) - prev;
        if (chunk <= 0) break;
        fee += chunk * tier.rate;
        prev = tier.max;
    }
    return Math.round(fee);
}

let calcType = "mua_ban";

function initCalculator() {
    $("#btn-open-calc").addEventListener("click", showCalculator);
    $("#btn-back-calc").addEventListener("click", showHome);

    const calcValueGroup = document.querySelector('label[for="calc-value"]')?.parentElement;
    const calcQuickBtns = $("#calc-quick-buttons");
    const singleInputEls = [$("#calc-relationship-group"), calcValueGroup, calcQuickBtns].filter(Boolean);
    const multiArea = $("#calc-multi-area");

    document.querySelectorAll(".calc-type-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            document.querySelectorAll(".calc-type-btn").forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            calcType = btn.dataset.type;
            const relGroup = $("#calc-relationship-group");
            const valueLabel = document.querySelector('label[for="calc-value"]');
            const valueHint = valueLabel ? valueLabel.nextElementSibling?.nextElementSibling : null;

            if (calcType === "tong_hop") {
                singleInputEls.forEach(el => el.classList.add("hidden"));
                multiArea.classList.remove("hidden");
                if (multiProperties.length === 0) addPropertyCard();
            } else {
                multiArea.classList.add("hidden");
                singleInputEls.forEach(el => {
                    if (el === relGroup) return;
                    el.classList.remove("hidden");
                });
                if (calcType === "cho_thue") {
                    relGroup.classList.add("hidden");
                    if (valueLabel) valueLabel.textContent = "Tổng doanh thu cho thuê BĐS/năm (VNĐ)";
                    if (valueHint) valueHint.textContent = "Tổng doanh thu tất cả BĐS cho thuê trong 1 năm dương lịch";
                } else if (calcType === "mua_ban") {
                    relGroup.classList.add("hidden");
                    if (valueLabel) valueLabel.textContent = "Giá trị BĐS (VNĐ)";
                    if (valueHint) valueHint.textContent = "Giá theo hợp đồng hoặc bảng giá UBND (lấy giá cao hơn)";
                } else {
                    relGroup.classList.remove("hidden");
                    if (valueLabel) valueLabel.textContent = "Giá trị BĐS (VNĐ)";
                    if (valueHint) valueHint.textContent = "Giá theo hợp đồng hoặc bảng giá UBND (lấy giá cao hơn)";
                }
            }
            $("#calc-results").classList.add("hidden");
        });
    });

    const valueInput = $("#calc-value");
    valueInput.addEventListener("input", () => {
        const raw = valueInput.value.replace(/\D/g, "");
        if (raw) {
            valueInput.value = Number(raw).toLocaleString("vi-VN");
        }
    });

    document.querySelectorAll(".calc-quick-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            valueInput.value = Number(btn.dataset.amount).toLocaleString("vi-VN");
            valueInput.focus();
        });
    });

    $("#btn-calculate").addEventListener("click", () => {
        if (calcType === "tong_hop") runMultiCalculation();
        else runCalculation();
    });

    $("#btn-add-property").addEventListener("click", addPropertyCard);

    $("#calc-relationship").addEventListener("change", () => {
        $("#calc-results").classList.add("hidden");
    });
}

function showCalculator() {
    hideAll();
    viewCalculator.classList.remove("hidden");
}

function runCalculation() {
    const rawValue = $("#calc-value").value.replace(/\D/g, "");
    const value = Number(rawValue);
    if (!value || value <= 0) {
        $("#calc-value").focus();
        return;
    }

    if (calcType === "cho_thue") {
        return runRentalCalculation(value);
    }

    const relationship = calcType !== "mua_ban" ? $("#calc-relationship").value : "none";
    const familyDirect = ["spouse", "parent_child", "grandparent"];
    const familyExpanded = [...familyDirect, "in_law", "sibling"];

    const isExemptTNCN = (calcType === "tang_cho" || calcType === "thua_ke") && familyDirect.includes(relationship);
    const isSoonExemptTNCN = (calcType === "tang_cho" || calcType === "thua_ke") &&
        (relationship === "sibling" || relationship === "in_law");
    const isExemptLPTB = (calcType === "tang_cho" || calcType === "thua_ke") && familyExpanded.includes(relationship);

    const thueTNCN = value * 0.02;
    const lePhi = value * 0.005;
    const phiThamDinh = value * 0.0015;
    const phiCongChung = calcCongChungFee(value);

    const fmt = (n) => Math.round(n).toLocaleString("vi-VN") + " đ";

    const tncnExemptNote = isExemptTNCN
        ? "Miễn — quan hệ gia đình trực hệ"
        : isSoonExemptTNCN
            ? "Hiện chưa miễn. Từ 01/7/2026 sẽ được miễn (Luật TNCN 2025)"
            : "";

    const rows = [
        {
            label: calcType === "mua_ban" ? "Thuế TNCN (bên bán — 2%)" : "Thuế TNCN (2%)",
            amount: thueTNCN,
            exempt: isExemptTNCN,
            soonExempt: isSoonExemptTNCN,
            exemptNote: tncnExemptNote,
        },
        {
            label: "Lệ phí trước bạ (0.5%)",
            amount: lePhi,
            exempt: isExemptLPTB,
            exemptNote: "Miễn — NĐ 175/2025/NĐ-CP",
        },
        {
            label: "Phí thẩm định hồ sơ (~0.15%)",
            amount: phiThamDinh,
            exempt: false,
        },
        {
            label: "Phí công chứng (lũy tiến)",
            amount: phiCongChung,
            exempt: false,
        },
    ];

    const total = rows.reduce((sum, r) => sum + (r.exempt ? 0 : r.amount), 0);

    const resultsBody = $("#calc-results-body");
    resultsBody.innerHTML = rows.map(r => {
        const showNote = r.exempt || r.soonExempt;
        const noteColor = r.exempt ? "text-emerald-600" : "text-amber-600";
        return `
        <div class="calc-result-row ${r.exempt ? 'exempt' : ''}">
            <div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">${r.label}</div>
                ${showNote && r.exemptNote ? `<div class="text-xs ${noteColor} font-medium" style="text-decoration:none">${r.exemptNote}</div>` : ""}
            </div>
            <div class="text-sm font-semibold ${r.exempt ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'}">${r.exempt ? '<span style="text-decoration:line-through">' + fmt(r.amount) + '</span> 0 đ' : fmt(r.amount)}</div>
        </div>`;
    }).join("");

    const typeLabels = { mua_ban: "mua bán", tang_cho: "tặng cho", thua_ke: "thừa kế" };
    const relLabels = { none: "", spouse: "vợ chồng", parent_child: "cha mẹ — con", in_law: "cha mẹ chồng/vợ — con dâu/rể", grandparent: "ông bà — cháu", sibling: "anh chị em ruột" };

    $("#calc-total").innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <div class="text-base font-bold text-gray-800 dark:text-gray-100">Tổng chi phí ước tính</div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Giao dịch ${typeLabels[calcType]}${relLabels[relationship] ? ' — ' + relLabels[relationship] : ''} • BĐS ${fmt(value).replace(' đ', '')} VNĐ</div>
            </div>
            <div class="text-xl font-bold text-emerald-700 dark:text-emerald-400">${fmt(total)}</div>
        </div>
        <div class="mt-3 text-xs text-gray-400 dark:text-gray-500">≈ ${(total / value * 100).toFixed(2)}% giá trị BĐS</div>
    `;

    const notes = [];
    if (isExemptTNCN) {
        notes.push({ type: "success", text: "Miễn thuế TNCN — quan hệ gia đình trực hệ (vợ chồng, cha mẹ-con, ông bà-cháu)." });
    }
    if (isSoonExemptTNCN) {
        notes.push({ type: "warning", text: "Hiện tại (trước 01/7/2026) vẫn phải nộp thuế TNCN 2%. Từ 01/7/2026, Luật Thuế TNCN 2025 (109/2025/QH15) sẽ MIỄN cho anh chị em ruột và cha mẹ chồng/vợ — con dâu/rể." });
    }
    if (isExemptLPTB) {
        notes.push({ type: "success", text: "Miễn lệ phí trước bạ theo Nghị định 175/2025/NĐ-CP (hiệu lực từ 01/7/2025)." });
    }
    notes.push({ type: "info", text: "Đây là ước tính. Chi phí thực tế tùy bảng giá đất UBND 2026, vị trí, diện tích. Bảng giá đất mới áp dụng từ 01/01/2026 có thể cao hơn đáng kể." });
    notes.push({ type: "info", text: "Phí công chứng tính theo biểu phí lũy tiến (TT 257/2016/TT-BTC). Chưa bao gồm phí dịch vụ ngoài." });

    const noteIcons = { success: "✅", warning: "⚠️", info: "ℹ️" };
    const noteBgs = { success: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300", warning: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300", info: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300" };

    $("#calc-notes").innerHTML = `<div class="space-y-2">${notes.map(n =>
        `<div class="rounded-xl p-3 text-xs border ${noteBgs[n.type]} flex items-start gap-2"><span>${noteIcons[n.type]}</span><span>${n.text}</span></div>`
    ).join("")}</div>`;

    $("#calc-results").classList.remove("hidden");
    $("#calc-results").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function runRentalCalculation(revenue) {
    const fmt = (n) => Math.round(n).toLocaleString("vi-VN") + " đ";
    const threshold = 1_000_000_000;
    const isAbove = revenue > threshold;

    const vatAmount = isAbove ? revenue * 0.05 : 0;
    const pitAmount = isAbove ? revenue * 0.05 : 0;
    const totalTax = vatAmount + pitAmount;

    const rows = [
        {
            label: "Thuế GTGT (5%)",
            amount: revenue * 0.05,
            exempt: !isAbove,
            exemptNote: !isAbove ? "Miễn — doanh thu ≤ 1 tỷ/năm (NĐ 144/2026)" : "",
        },
        {
            label: "Thuế TNCN (5%)",
            amount: revenue * 0.05,
            exempt: !isAbove,
            exemptNote: !isAbove ? "Miễn — doanh thu ≤ 1 tỷ/năm (NĐ 144/2026)" : "",
        },
    ];

    const resultsBody = $("#calc-results-body");
    resultsBody.innerHTML = rows.map(r => `
        <div class="calc-result-row ${r.exempt ? 'exempt' : ''}">
            <div>
                <div class="text-sm font-medium text-gray-700 dark:text-gray-300">${r.label}</div>
                ${r.exempt && r.exemptNote ? `<div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium">${r.exemptNote}</div>` : ""}
            </div>
            <div class="text-sm font-semibold ${r.exempt ? 'text-gray-400 dark:text-gray-500' : 'text-gray-800 dark:text-gray-100'}">${r.exempt ? '<span style="text-decoration:line-through">' + fmt(r.amount) + '</span> 0 đ' : fmt(r.amount)}</div>
        </div>`).join("");

    $("#calc-total").innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <div class="text-base font-bold text-gray-800 dark:text-gray-100">Tổng thuế cho thuê BĐS/năm</div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">Doanh thu cho thuê: ${fmt(revenue).replace(' đ', '')} VNĐ/năm${isAbove ? ' (vượt ngưỡng 1 tỷ)' : ' (≤ ngưỡng 1 tỷ)'}</div>
            </div>
            <div class="text-xl font-bold ${isAbove ? 'text-red-600 dark:text-red-400' : 'text-emerald-700 dark:text-emerald-400'}">${fmt(totalTax)}</div>
        </div>
        ${isAbove ? `<div class="mt-3 text-xs text-gray-400 dark:text-gray-500">= ${(totalTax / revenue * 100).toFixed(0)}% doanh thu (GTGT 5% + TNCN 5%)</div>` : ""}
    `;

    const notes = [];
    if (!isAbove) {
        notes.push({ type: "success", text: `Doanh thu ${fmt(revenue)} ≤ 1 tỷ đồng/năm → KHÔNG phải nộp thuế GTGT và thuế TNCN (NĐ 144/2026/NĐ-CP). Tuy nhiên vẫn PHẢI kê khai thuế theo quy định.` });
    } else {
        notes.push({ type: "warning", text: `Doanh thu ${fmt(revenue)} > 1 tỷ đồng/năm → phải nộp thuế GTGT 5% + TNCN 5% = tổng 10% doanh thu. Ngưỡng 1 tỷ tính cho TỔNG tất cả BĐS của 1 cá nhân.` });
    }
    notes.push({ type: "info", text: "Ngưỡng 1 tỷ đồng/năm tính theo năm dương lịch (T1–T12), không theo năm hợp đồng. Doanh thu tính cho tổng tất cả BĐS cho thuê của 1 cá nhân." });
    notes.push({ type: "info", text: "Kỳ kê khai: chọn năm 1 lần (hạn 31/01 năm sau) hoặc 6 tháng/lần (hạn 31/07 và 31/01). Kê khai bằng Mẫu 01/BĐS + Phụ lục 01/BK-BĐS." });
    notes.push({ type: "info", text: "Nếu cho DN thuê và có thỏa thuận DN khai thay → DN dùng Mẫu 01/TCKT, cá nhân không cần đăng ký MST riêng." });

    const noteIcons = { success: "✅", warning: "⚠️", info: "ℹ️" };
    const noteBgs = { success: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300", warning: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300", info: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300" };

    $("#calc-notes").innerHTML = `<div class="space-y-2">${notes.map(n =>
        `<div class="rounded-xl p-3 text-xs border ${noteBgs[n.type]} flex items-start gap-2"><span>${noteIcons[n.type]}</span><span>${n.text}</span></div>`
    ).join("")}</div>`;

    $("#calc-results").classList.remove("hidden");
    $("#calc-results").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// ================================================================
// MULTI-PROPERTY CALCULATOR
// ================================================================
let multiProperties = [];
let multiIdCounter = 0;

function addPropertyCard() {
    multiIdCounter++;
    const id = multiIdCounter;
    multiProperties.push({ id, type: "mua_ban", value: 0, relationship: "none" });
    renderMultiList();
}

function removePropertyCard(id) {
    multiProperties = multiProperties.filter(p => p.id !== id);
    if (multiProperties.length === 0) addPropertyCard();
    renderMultiList();
}

function renderMultiList() {
    const container = $("#calc-multi-list");
    container.innerHTML = multiProperties.map((p, idx) => `
        <div class="multi-prop-card" data-prop-id="${p.id}">
            ${multiProperties.length > 1 ? `<button class="multi-prop-card__remove" data-remove-id="${p.id}" title="Xóa">✕</button>` : ""}
            <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold text-emerald-600 dark:text-emerald-400">BĐS #${idx + 1}</span>
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                    <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Loại giao dịch</label>
                    <select class="form-input text-sm mp-type" data-mp-id="${p.id}">
                        <option value="mua_ban" ${p.type === "mua_ban" ? "selected" : ""}>🏠 Mua bán</option>
                        <option value="tang_cho" ${p.type === "tang_cho" ? "selected" : ""}>🎁 Tặng cho</option>
                        <option value="thua_ke" ${p.type === "thua_ke" ? "selected" : ""}>📜 Thừa kế</option>
                        <option value="cho_thue" ${p.type === "cho_thue" ? "selected" : ""}>🏘️ Cho thuê/năm</option>
                    </select>
                </div>
                <div>
                    <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Giá trị (VNĐ)</label>
                    <input type="text" class="form-input text-sm mp-value" data-mp-id="${p.id}" placeholder="VD: 3,000,000,000" inputmode="numeric" value="${p.value ? Number(p.value).toLocaleString("vi-VN") : ""}">
                </div>
            </div>
            <div class="mp-rel-group ${p.type === "tang_cho" || p.type === "thua_ke" ? "" : "hidden"} mt-2">
                <label class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Quan hệ giữa hai bên</label>
                <select class="form-input text-sm mp-relationship" data-mp-id="${p.id}">
                    <option value="none" ${p.relationship === "none" ? "selected" : ""}>Không có quan hệ</option>
                    <option value="spouse" ${p.relationship === "spouse" ? "selected" : ""}>Vợ — chồng</option>
                    <option value="parent_child" ${p.relationship === "parent_child" ? "selected" : ""}>Cha mẹ — con</option>
                    <option value="in_law" ${p.relationship === "in_law" ? "selected" : ""}>Cha mẹ chồng/vợ — con dâu/rể</option>
                    <option value="grandparent" ${p.relationship === "grandparent" ? "selected" : ""}>Ông bà — cháu</option>
                    <option value="sibling" ${p.relationship === "sibling" ? "selected" : ""}>Anh chị em ruột</option>
                </select>
            </div>
        </div>
    `).join("");

    container.querySelectorAll(".mp-type").forEach(sel => {
        sel.addEventListener("change", (e) => {
            const id = Number(e.target.dataset.mpId);
            const prop = multiProperties.find(p => p.id === id);
            if (prop) prop.type = e.target.value;
            const card = e.target.closest(".multi-prop-card");
            const relGroup = card.querySelector(".mp-rel-group");
            if (relGroup) relGroup.classList.toggle("hidden", e.target.value !== "tang_cho" && e.target.value !== "thua_ke");
        });
    });

    container.querySelectorAll(".mp-value").forEach(input => {
        input.addEventListener("input", (e) => {
            const raw = e.target.value.replace(/\D/g, "");
            const id = Number(e.target.dataset.mpId);
            const prop = multiProperties.find(p => p.id === id);
            if (prop) prop.value = Number(raw);
            if (raw) e.target.value = Number(raw).toLocaleString("vi-VN");
        });
    });

    container.querySelectorAll(".mp-relationship").forEach(sel => {
        sel.addEventListener("change", (e) => {
            const id = Number(e.target.dataset.mpId);
            const prop = multiProperties.find(p => p.id === id);
            if (prop) prop.relationship = e.target.value;
        });
    });

    container.querySelectorAll(".multi-prop-card__remove").forEach(btn => {
        btn.addEventListener("click", () => removePropertyCard(Number(btn.dataset.removeId)));
    });
}

function runMultiCalculation() {
    container_querySyncValues();

    const rentalProps = multiProperties.filter(p => p.type === "cho_thue" && p.value > 0);
    const transactionProps = multiProperties.filter(p => p.type !== "cho_thue" && p.value > 0);

    if (rentalProps.length === 0 && transactionProps.length === 0) {
        const firstInput = document.querySelector(".mp-value");
        if (firstInput) firstInput.focus();
        return;
    }

    const fmt = (n) => Math.round(n).toLocaleString("vi-VN") + " đ";
    const familyDirect = ["spouse", "parent_child", "grandparent"];
    const familyExpanded = [...familyDirect, "in_law", "sibling"];
    const typeLabels = { mua_ban: "Mua bán", tang_cho: "Tặng cho", thua_ke: "Thừa kế" };
    const noteIcons = { success: "✅", warning: "⚠️", info: "ℹ️" };
    const noteBgs = { success: "bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-800 dark:text-green-300", warning: "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300", info: "bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300" };

    let html = "";
    let grandTotal = 0;
    const allNotes = [];

    if (rentalProps.length > 0) {
        const totalRevenue = rentalProps.reduce((s, p) => s + p.value, 0);
        const threshold = 1_000_000_000;
        const isAbove = totalRevenue > threshold;
        const vatAmount = isAbove ? totalRevenue * 0.05 : 0;
        const pitAmount = isAbove ? totalRevenue * 0.05 : 0;
        const rentalTax = vatAmount + pitAmount;
        grandTotal += rentalTax;

        html += `<div class="multi-result-group">
            <div class="multi-result-group__title">🏘️ Cho thuê — ${rentalProps.length} BĐS (tổng ${fmt(totalRevenue).replace(" đ", "")} VNĐ/năm)</div>
            <div class="space-y-2">
                <div class="calc-result-row ${!isAbove ? "exempt" : ""}">
                    <div>
                        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Thuế GTGT (5%)</div>
                        ${!isAbove ? `<div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium" style="text-decoration:none">Miễn — tổng doanh thu ≤ 1 tỷ/năm</div>` : ""}
                    </div>
                    <div class="text-sm font-semibold ${!isAbove ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"}">${!isAbove ? '<span style="text-decoration:line-through">' + fmt(totalRevenue * 0.05) + "</span> 0 đ" : fmt(vatAmount)}</div>
                </div>
                <div class="calc-result-row ${!isAbove ? "exempt" : ""}">
                    <div>
                        <div class="text-sm font-medium text-gray-700 dark:text-gray-300">Thuế TNCN (5%)</div>
                        ${!isAbove ? `<div class="text-xs text-emerald-600 dark:text-emerald-400 font-medium" style="text-decoration:none">Miễn — tổng doanh thu ≤ 1 tỷ/năm</div>` : ""}
                    </div>
                    <div class="text-sm font-semibold ${!isAbove ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"}">${!isAbove ? '<span style="text-decoration:line-through">' + fmt(totalRevenue * 0.05) + "</span> 0 đ" : fmt(pitAmount)}</div>
                </div>
            </div>
        </div>`;

        if (!isAbove) {
            allNotes.push({ type: "success", text: `Cho thuê: Tổng doanh thu ${fmt(totalRevenue)} ≤ 1 tỷ/năm → miễn thuế GTGT và TNCN.` });
        } else {
            allNotes.push({ type: "warning", text: `Cho thuê: Tổng doanh thu ${fmt(totalRevenue)} > 1 tỷ/năm → phải nộp GTGT 5% + TNCN 5% = 10%.` });
        }
    }

    transactionProps.forEach((p, idx) => {
        const value = p.value;
        const relationship = p.relationship || "none";
        const isExemptTNCN = (p.type === "tang_cho" || p.type === "thua_ke") && familyDirect.includes(relationship);
        const isSoonExemptTNCN = (p.type === "tang_cho" || p.type === "thua_ke") && (relationship === "sibling" || relationship === "in_law");
        const isExemptLPTB = (p.type === "tang_cho" || p.type === "thua_ke") && familyExpanded.includes(relationship);

        const thueTNCN = value * 0.02;
        const lePhi = value * 0.005;
        const phiThamDinh = value * 0.0015;
        const phiCongChung = calcCongChungFee(value);

        const rows = [
            { label: p.type === "mua_ban" ? "Thuế TNCN (bên bán — 2%)" : "Thuế TNCN (2%)", amount: thueTNCN, exempt: isExemptTNCN, soonExempt: isSoonExemptTNCN, exemptNote: isExemptTNCN ? "Miễn — quan hệ trực hệ" : isSoonExemptTNCN ? "Từ 01/7/2026 sẽ miễn" : "" },
            { label: "Lệ phí trước bạ (0.5%)", amount: lePhi, exempt: isExemptLPTB, exemptNote: "Miễn — NĐ 175/2025" },
            { label: "Phí thẩm định (~0.15%)", amount: phiThamDinh, exempt: false },
            { label: "Phí công chứng (lũy tiến)", amount: phiCongChung, exempt: false },
        ];

        const propTotal = rows.reduce((s, r) => s + (r.exempt ? 0 : r.amount), 0);
        grandTotal += propTotal;

        const propIndex = multiProperties.indexOf(p) + 1;

        html += `<div class="multi-result-group">
            <div class="multi-result-group__title">${p.type === "mua_ban" ? "🏠" : p.type === "tang_cho" ? "🎁" : "📜"} ${typeLabels[p.type]} — BĐS #${propIndex} (${fmt(value).replace(" đ", "")} VNĐ)</div>
            <div class="space-y-2">
                ${rows.map(r => {
                    const showNote = r.exempt || r.soonExempt;
                    const noteColor = r.exempt ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400";
                    return `<div class="calc-result-row ${r.exempt ? "exempt" : ""}">
                        <div>
                            <div class="text-sm font-medium text-gray-700 dark:text-gray-300">${r.label}</div>
                            ${showNote && r.exemptNote ? `<div class="text-xs ${noteColor} font-medium" style="text-decoration:none">${r.exemptNote}</div>` : ""}
                        </div>
                        <div class="text-sm font-semibold ${r.exempt ? "text-gray-400 dark:text-gray-500" : "text-gray-800 dark:text-gray-100"}">${r.exempt ? '<span style="text-decoration:line-through">' + fmt(r.amount) + "</span> 0 đ" : fmt(r.amount)}</div>
                    </div>`;
                }).join("")}
                <div class="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-600">
                    <span class="text-xs font-semibold text-gray-600 dark:text-gray-300">Tổng BĐS #${propIndex}</span>
                    <span class="text-sm font-bold text-gray-800 dark:text-gray-100">${fmt(propTotal)}</span>
                </div>
            </div>
        </div>`;

        if (isExemptTNCN) allNotes.push({ type: "success", text: `BĐS #${propIndex}: Miễn thuế TNCN — quan hệ trực hệ.` });
        if (isSoonExemptTNCN) allNotes.push({ type: "warning", text: `BĐS #${propIndex}: Hiện chưa miễn TNCN. Từ 01/7/2026 sẽ được miễn (Luật TNCN 2025).` });
        if (isExemptLPTB) allNotes.push({ type: "success", text: `BĐS #${propIndex}: Miễn lệ phí trước bạ — NĐ 175/2025/NĐ-CP.` });
    });

    allNotes.push({ type: "info", text: "Đây là ước tính. Chi phí thực tế tùy bảng giá đất UBND, vị trí, diện tích." });

    const resultsBody = $("#calc-results-body");
    resultsBody.innerHTML = html;

    const totalCount = multiProperties.filter(p => p.value > 0).length;
    $("#calc-total").innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <div class="text-base font-bold text-gray-800 dark:text-gray-100">Tổng chi phí ước tính (${totalCount} BĐS)</div>
                <div class="text-xs text-gray-400 dark:text-gray-500 mt-0.5">${rentalProps.length > 0 ? rentalProps.length + " cho thuê" : ""}${rentalProps.length > 0 && transactionProps.length > 0 ? " + " : ""}${transactionProps.length > 0 ? transactionProps.length + " giao dịch" : ""}</div>
            </div>
            <div class="text-xl font-bold text-emerald-700 dark:text-emerald-400">${fmt(grandTotal)}</div>
        </div>`;

    $("#calc-notes").innerHTML = `<div class="space-y-2">${allNotes.map(n =>
        `<div class="rounded-xl p-3 text-xs border ${noteBgs[n.type]} flex items-start gap-2"><span>${noteIcons[n.type]}</span><span>${n.text}</span></div>`
    ).join("")}</div>`;

    $("#calc-results").classList.remove("hidden");
    $("#calc-results").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function container_querySyncValues() {
    document.querySelectorAll(".mp-value").forEach(input => {
        const id = Number(input.dataset.mpId);
        const prop = multiProperties.find(p => p.id === id);
        if (prop) prop.value = Number(input.value.replace(/\D/g, ""));
    });
    document.querySelectorAll(".mp-type").forEach(sel => {
        const id = Number(sel.dataset.mpId);
        const prop = multiProperties.find(p => p.id === id);
        if (prop) prop.type = sel.value;
    });
    document.querySelectorAll(".mp-relationship").forEach(sel => {
        const id = Number(sel.dataset.mpId);
        const prop = multiProperties.find(p => p.id === id);
        if (prop) prop.relationship = sel.value;
    });
}

// ================================================================
// FORM RENDERERS
// ================================================================

// RENDER: Mẫu số 18 — Đơn đăng ký biến động (NĐ 151/2025, thay thế Mẫu 11/ĐK)
function renderMau18(data) {
    const ctm = { chuyen_nhuong: "Nhận chuyển nhượng quyền sử dụng đất", tang_cho: "Nhận tặng cho quyền sử dụng đất", thua_ke: "Nhận thừa kế quyền sử dụng đất", khac: "" };
    const itm = { cmnd: "CMND", cccd: "CCCD", dinh_danh: "Định danh cá nhân", hochieu: "Hộ chiếu", gpkd: "GPKD" };
    const ct = ctm[data.changeType] || "";
    const dt = data.changeDetail || ct;
    const il = itm[data.idType] || "";
    const it = il && data.idNumber ? `${il} số: ${data.idNumber}` : data.idNumber || "";
    const d = data.signDate ? new Date(data.signDate) : null;
    const dy = d ? d.getDate() : "...."; const mo = d ? d.getMonth() + 1 : "..."; const yr = d ? d.getFullYear() : "……";
    const gd = data.gcnNgayCap ? new Date(data.gcnNgayCap) : null;
    const gdy = gd ? gd.getDate() : "..."; const gmo = gd ? gd.getMonth() + 1 : "..."; const gyr = gd ? gd.getFullYear() : "…";
    const docs = [data.doc1, data.doc2, data.doc3, data.doc4].filter(Boolean);
    return `<div class="form-code">Mẫu số 18</div>
<div class="form-code" style="font-size:9pt;margin-top:2px">(Ban hành kèm theo Nghị định số 151/2025/NĐ-CP)</div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">ĐƠN ĐĂNG KÝ BIẾN ĐỘNG ĐẤT ĐAI, TÀI SẢN GẮN LIỀN VỚI ĐẤT</div>
<div class="paper-recipient">Kính gửi: <span class="field-value">${data.recipient||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold">I. PHẦN KÊ KHAI CỦA NGƯỜI ĐĂNG KÝ</div>

<div class="field-row" style="margin-top:10px"><b>1. Người sử dụng đất, chủ sở hữu tài sản gắn liền với đất</b></div>
<div class="field-row" style="padding-left:20px">1.1. Tên <i>(viết chữ in hoa)</i>: <span class="field-value">${(data.fullName||"").toUpperCase()}</span></div>
<div class="field-row" style="padding-left:20px">1.2. Giấy tờ nhân thân/pháp nhân: <span class="field-value">${it}</span></div>
<div class="field-row" style="padding-left:20px">1.3. Địa chỉ: <span class="field-value">${data.address||""}</span></div>
<div class="field-row" style="padding-left:20px">1.4. Điện thoại: <span class="field-value">${data.phone||""}</span> &nbsp;&nbsp; Email: <span class="field-value">${data.email||""}</span></div>

<div class="field-row" style="margin-top:12px"><b>2. Giấy chứng nhận đã cấp</b></div>
<div class="field-row" style="padding-left:20px">2.1. Số vào sổ cấp GCN: <span class="field-value">${data.gcnSoVaoSo||""}</span></div>
<div class="field-row" style="padding-left:20px">2.2. Số phát hành (Số seri): <span class="field-value">${data.gcnSoPhatHanh||""}</span></div>
<div class="field-row" style="padding-left:20px">2.3. Ngày cấp: ngày ${gdy} tháng ${gmo} năm ${gyr}</div>

<div class="field-row" style="margin-top:12px"><b>3. Nội dung biến động</b></div>
<div class="field-row" style="padding-left:20px">3.1. Nội dung biến động:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="min-width:95%;display:block">${dt||""}</span></div>
${data.changeReason ? `<div class="field-row" style="padding-left:20px">3.2. Lý do biến động:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="min-width:95%;display:block">${data.changeReason}</span></div>` : `<div class="field-row" style="padding-left:20px">3.2. Lý do biến động: <span class="field-value" style="min-width:70%"></span></div>`}

<div class="field-row" style="margin-top:12px"><b>4. Giấy tờ liên quan nộp kèm theo đơn này</b></div>
<div class="field-row" style="padding-left:20px">(1) Giấy chứng nhận đã cấp;</div>
${docs.length ? docs.map((dc, i) => `<div class="field-row" style="padding-left:20px">(${i+2}) ${escapeHtml(dc)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">(2) <span class="field-value" style="min-width:80%"></span></div>
<div class="field-row" style="padding-left:20px">(3) <span class="field-value" style="min-width:80%"></span></div>`}

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan nội dung kê khai trên đơn là đúng sự thật, đề nghị được đăng ký biến động theo quy định của pháp luật.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:20px">
<div style="text-align:center;width:45%"><div class="date-line">&nbsp;</div><div class="signer-title">XÁC NHẬN CỦA UBND XÃ/PHƯỜNG</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${dy} tháng ${mo} năm ${yr}</div><div class="signer-title">Người đăng ký</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.fullName||""}</div></div>
</div>`;
}

function renderMau03BDS(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const gd = fd(data.gcnDate);
    const tp = fd(data.taxPeriodDate);
    const tm = { mua_ban: "Chuyển nhượng (mua bán)", tang_cho: "Tặng cho", thua_ke: "Thừa kế" };
    const relMap = { none: "", spouse: "Vợ/Chồng", parent_child: "Cha mẹ — Con", grandparent: "Ông bà — Cháu", in_law: "Cha mẹ chồng/vợ — Con dâu/rể", sibling: "Anh chị em ruột" };
    const vnd = (v) => v ? Number(v).toLocaleString("vi-VN") + " đồng" : "";
    const tb = (c) => { const dg = (c||"").replace(/\D/g,"").split(""); const pt = [1,1,1,1,1,1,1,1,1,1,"s",1,1,1]; let i=0; return pt.map(p => p==="s"?`<span class="tax-code-box separator">-</span>`:`<span class="tax-code-box">${dg[i++]??""}</span>`).join(""); };
    const ck = (v) => v ? "✓" : "";
    const iF = data.isFirstTime !== "supplement";

    const coOwners = [];
    for (let i = 1; i <= 2; i++) {
        const n = data[`coOwner${i}Name`];
        if (n) coOwners.push({ name: n, taxCode: data[`coOwner${i}TaxCode`]||"", id: data[`coOwner${i}Id`]||"", ratio: data[`coOwner${i}Ratio`]||"" });
    }

    return `<div class="form-code">Mẫu số: <b>03/BĐS-TNCN</b><br><span style="font-size:10pt">(Ban hành kèm theo Thông tư số 80/2021/TT-BTC ngày 29/9/2021 của Bộ Tài chính)</span></div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">TỜ KHAI THUẾ THU NHẬP CÁ NHÂN</div>
<div class="paper-subtitle">(Áp dụng cho cá nhân có thu nhập từ chuyển nhượng bất động sản;<br>cá nhân có thu nhập từ nhận thừa kế, quà tặng là bất động sản)</div>

<div class="field-row" style="margin-top:12px">[01] Kỳ tính thuế: Theo từng lần phát sinh ngày ${tp.d} tháng ${tp.m} năm ${tp.y}</div>
<div class="field-row">[02] Lần đầu: <span class="checkbox-inline">${iF?"✓":""}</span> &nbsp;&nbsp;&nbsp; [03] Bổ sung lần thứ: <span class="field-value" style="min-width:60px">${!iF?(data.supplementNumber||"..."):"…"}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">I. THÔNG TIN NGƯỜI CHUYỂN NHƯỢNG, NGƯỜI ĐỂ LẠI THỪA KẾ, NGƯỜI TẶNG CHO BẤT ĐỘNG SẢN</div>
<div class="field-row" style="margin-top:8px">[04] <b>Họ và tên:</b> <span class="field-value">${data.taxpayerName||""}</span></div>
<div class="field-row">[05] Mã số thuế: <span class="tax-code-boxes">${tb(data.taxCode)}</span></div>
<div class="field-row">[06] Số CMND/CCCD/Định danh cá nhân/Hộ chiếu: <span class="field-value">${data.idNumber||""}</span></div>
<div class="field-row">[07] Địa chỉ: <span class="field-value">${data.taxpayerAddress||""}</span></div>
<div class="field-row">[08] Xã/phường/đặc khu: <span class="field-value">${data.ward||""}</span></div>
<div class="field-row">[09] Quận/huyện: <span class="field-value">${data.district||""}</span> &nbsp;&nbsp; [10] Tỉnh/TP: <span class="field-value">${data.province||""}</span></div>
<div class="field-row">[11] ĐT: <span class="field-value">${data.phone||""}</span> &nbsp; [12] Fax: <span class="field-value">${data.fax||""}</span> &nbsp; [13] Email: <span class="field-value">${data.email||""}</span></div>
${data.agentName ? `<div class="field-row" style="margin-top:8px">[14] Tên đại lý thuế (nếu có): <span class="field-value">${data.agentName}</span></div>
<div class="field-row">[15] MST: <span class="tax-code-boxes">${tb(data.agentTaxCode)}</span></div>
<div class="field-row">[16] HĐ đại lý thuế: Số <span class="field-value">${data.agentContractNo||""}</span> ngày <span class="field-value">${data.agentContractDate||""}</span></div>` : ""}

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">II. THÔNG TIN NGƯỜI NHẬN CHUYỂN NHƯỢNG, NGƯỜI NHẬN THỪA KẾ, NGƯỜI ĐƯỢC TẶNG CHO BẤT ĐỘNG SẢN</div>
<div class="field-row" style="margin-top:8px">[17] <b>Họ và tên:</b> <span class="field-value">${data.buyerName||""}</span></div>
<div class="field-row">[18] Mã số thuế: <span class="tax-code-boxes">${tb(data.buyerTaxCode)}</span></div>
<div class="field-row">[19] Số CMND/CCCD/Định danh cá nhân/Hộ chiếu: <span class="field-value">${data.buyerIdNumber||""}</span></div>
<div class="field-row">[20] Địa chỉ: <span class="field-value">${data.buyerAddress||""}</span></div>
<div class="field-row">[21] Xã/phường: <span class="field-value">${data.buyerWard||""}</span></div>
<div class="field-row">[22] Quận/huyện: <span class="field-value">${data.buyerDistrict||""}</span> &nbsp;&nbsp; [23] Tỉnh/TP: <span class="field-value">${data.buyerProvince||""}</span></div>
<div class="field-row">[24] ĐT: <span class="field-value">${data.buyerPhone||""}</span> &nbsp; [25] Email: <span class="field-value">${data.buyerEmail||""}</span></div>
<div class="field-row">[26] Mối quan hệ: <span class="field-value">${relMap[data.relationship]||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">III. LOẠI BẤT ĐỘNG SẢN CHUYỂN NHƯỢNG</div>
<div class="field-row" style="margin-top:8px;padding-left:20px">[37] Đất không có nhà: <span class="checkbox-inline">${ck(data.propertyType==="dat_khong_nha")}</span> &nbsp;&nbsp; [38] Nhà đất: <span class="checkbox-inline">${ck(data.propertyType==="nha_dat")}</span></div>
<div class="field-row" style="padding-left:20px">[39] Căn hộ chung cư: <span class="checkbox-inline">${ck(data.propertyType==="can_ho")}</span> &nbsp;&nbsp; [40] BĐS khác: <span class="checkbox-inline">${ck(data.propertyType==="khac")}</span> ${data.propertyTypeOther ? `<span class="field-value">${data.propertyTypeOther}</span>` : ""}</div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">IV. THÔNG TIN BẤT ĐỘNG SẢN CHUYỂN NHƯỢNG</div>
<div class="field-row" style="margin-top:8px">[41] Địa chỉ BĐS: <span class="field-value">${data.propertyAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">[41.1] Xã/phường: <span class="field-value">${data.propertyWard||""}</span> &nbsp; [41.2] Quận/huyện: <span class="field-value">${data.propertyDistrict||""}</span> &nbsp; [41.3] Tỉnh/TP: <span class="field-value">${data.propertyProvince||""}</span></div>
<div class="field-row" style="padding-left:20px">[41.4] Thửa đất số: <span class="field-value">${data.parcelNumber||""}</span> &nbsp; [41.5] Tờ bản đồ số: <span class="field-value">${data.mapNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">[41.6] GCN QSD đất số: <span class="field-value">${data.gcnNumber||""}</span> &nbsp; Ngày cấp: ${gd.d}/${gd.m}/${gd.y}</div>
<div class="field-row" style="padding-left:20px">[41.7] Chi tiết loại đất:</div>
<table class="form-table" style="width:100%;margin:6px 0 6px 20px;border-collapse:collapse;font-size:12pt">
<tr style="background:#f3f3f3"><th style="border:1px solid #333;padding:4px">Loại đất</th><th style="border:1px solid #333;padding:4px">Diện tích (m²)</th><th style="border:1px solid #333;padding:4px">Vị trí</th></tr>
<tr><td style="border:1px solid #333;padding:4px">${data.landType1||""}</td><td style="border:1px solid #333;padding:4px;text-align:center">${data.landArea1||""}</td><td style="border:1px solid #333;padding:4px;text-align:center">${data.landPosition1||""}</td></tr>
${data.landType2 ? `<tr><td style="border:1px solid #333;padding:4px">${data.landType2}</td><td style="border:1px solid #333;padding:4px;text-align:center">${data.landArea2||""}</td><td style="border:1px solid #333;padding:4px;text-align:center">${data.landPosition2||""}</td></tr>` : ""}
</table>
${data.houseArea ? `<div class="field-row">[42] Nhà: DT <span class="field-value">${data.houseArea}</span> m² &nbsp; Cấp/Hạng: <span class="field-value">${data.houseGrade||""}</span> &nbsp; Số tầng: <span class="field-value">${data.houseFloors||""}</span> &nbsp; Năm XD: <span class="field-value">${data.buildYear||""}</span></div>` : ""}

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">V. GIÁ CHUYỂN NHƯỢNG VÀ THUẾ THU NHẬP CÁ NHÂN</div>
<div class="field-row" style="margin-top:8px">[43] Hình thức: <span class="field-value">${tm[data.transferType]||""}</span></div>
<div class="field-row">[44] Giá chuyển nhượng trên HĐ: <span class="field-value">${vnd(data.contractValue)}</span></div>
<div class="field-row">[45] Giá đất theo bảng giá UBND: <span class="field-value">${vnd(data.landRefPrice)}</span></div>
<div class="field-row">[46] Giá tính LPTB nhà: <span class="field-value">${vnd(data.houseRefPrice)}</span></div>
<div class="field-row"><b>[47] Giá tính thuế:</b> <span class="field-value" style="font-weight:bold">${vnd(data.taxableValue)}</span></div>
<div class="field-row">[48] Thuế suất: <span class="field-value">${data.taxRate||"2"}</span>%</div>
<div class="field-row"><b>[49] Số thuế TNCN phải nộp:</b> <span class="field-value" style="font-weight:bold">${vnd(data.taxAmount)}</span></div>
<div class="field-row">[50] Số thuế được miễn/giảm: <span class="field-value">${vnd(data.exemptAmount)}</span></div>
<div class="field-row"><b>[51] Số thuế còn phải nộp:</b> <span class="field-value" style="font-weight:bold">${vnd(data.taxPayable)}</span></div>

${data.isExempt==="yes" ? `<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">VI. MIỄN/GIẢM THUẾ</div>
<div class="field-row" style="margin-top:8px">Lý do: <span class="field-value">${data.exemptReason||""}</span></div>
<div class="field-row">Căn cứ pháp lý: <span class="field-value">${data.exemptLegalBasis||""}</span></div>
<div class="field-row">Giấy tờ CM: <span class="field-value">${data.exemptDocs||""}</span></div>` : ""}

${coOwners.length ? `<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">THÔNG TIN ĐỒNG CHỦ SỞ HỮU</div>
<table class="form-table" style="width:100%;margin:6px 0;border-collapse:collapse;font-size:12pt">
<tr style="background:#f3f3f3"><th style="border:1px solid #333;padding:4px">STT</th><th style="border:1px solid #333;padding:4px">Tên</th><th style="border:1px solid #333;padding:4px">MST</th><th style="border:1px solid #333;padding:4px">CMND/CCCD</th><th style="border:1px solid #333;padding:4px">Tỷ lệ (%)</th></tr>
${coOwners.map((c,i) => `<tr><td style="border:1px solid #333;padding:4px;text-align:center">${i+1}</td><td style="border:1px solid #333;padding:4px">${c.name}</td><td style="border:1px solid #333;padding:4px">${c.taxCode}</td><td style="border:1px solid #333;padding:4px">${c.id}</td><td style="border:1px solid #333;padding:4px;text-align:center">${c.ratio}</td></tr>`).join("")}
</table>` : ""}

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan số liệu khai trên là đúng và chịu trách nhiệm trước pháp luật về những số liệu đã khai./.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:20px">
<div style="text-align:center;width:45%"><div class="signer-title">NHÂN VIÊN ĐẠI LÝ THUẾ</div><div class="signer-note">(Ký, ghi rõ họ tên, chứng chỉ hành nghề)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signProvince||"……"}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">NGƯỜI NỘP THUẾ hoặc<br>ĐẠI DIỆN HỢP PHÁP CỦA NGƯỜI NỘP THUẾ</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.taxpayerName||""}</div></div>
</div>`;
}

function renderMau01LPTB(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const tp = fd(data.taxPeriodDate), td = fd(data.transferDate), sd = fd(data.signDate);
    const tb = (c) => { const dg = (c||"").replace(/\D/g,"").split(""); const pt = [1,1,1,1,1,1,1,1,1,1,"s",1,1,1]; let i=0; return pt.map(p => p==="s"?`<span class="tax-code-box separator">-</span>`:`<span class="tax-code-box">${dg[i++]??""}</span>`).join(""); };
    const om = { nha_nuoc_giao:"Đất được Nhà nước giao", nha_nuoc_thue:"Đất được Nhà nước cho thuê", chuyen_nhuong:"Đất nhận chuyển nhượng", thua_ke:"Đất nhận thừa kế", tang_cho:"Đất nhận tặng cho" };
    const pm = { mat_tien:"Mặt tiền đường phố", ngo:"Ngõ / Hẻm", khac:"Khác" };
    const rd = (data.relatedDocs||"").split("\n").filter(Boolean);
    const iF = data.isFirstTime !== "supplement";
    const vnd = (v) => v ? Number(v).toLocaleString("vi-VN")+" đồng" : "";
    const ck = (v) => v ? "✓" : "";

    const coOwners = [];
    for (let i = 1; i <= 3; i++) {
        const n = data[`coOwner${i}Name`];
        if (n) coOwners.push({ name: n, taxCode: data[`coOwner${i}TaxCode`]||"", id: data[`coOwner${i}Id`]||"", ratio: data[`coOwner${i}Ratio`]||"" });
    }

    let agentSection = "";
    if (data.hasAgent === "dai_ly") {
        agentSection = `<div class="field-row" style="margin-top:8px">[13] <b>Đại lý thuế (nếu có):</b></div>
<div class="field-row" style="padding-left:20px">Tên: <span class="field-value">${data.agentName||""}</span></div>
<div class="field-row" style="padding-left:20px">MST: <span class="tax-code-boxes">${tb(data.agentTaxCode)}</span></div>
<div class="field-row" style="padding-left:20px">HĐ đại lý thuế: Số <span class="field-value">${data.agentContractNumber||""}</span> ngày <span class="field-value">${data.agentContractDate||""}</span></div>`;
    } else if (data.hasAgent === "uy_quyen") {
        agentSection = `<div class="field-row" style="margin-top:8px">[13] <b>Tổ chức, cá nhân được ủy quyền khai thay cho người nộp thuế:</b></div>
<div class="field-row" style="padding-left:20px">Tên: <span class="field-value">${data.proxyName||""}</span></div>
<div class="field-row" style="padding-left:20px">MST: <span class="tax-code-boxes">${tb(data.proxyTaxCode)}</span></div>
<div class="field-row" style="padding-left:20px">Văn bản ủy quyền: Số <span class="field-value">${data.proxyDocNumber||""}</span> ngày <span class="field-value">${data.proxyDocDate||""}</span></div>`;
    } else {
        agentSection = `<div class="field-row" style="margin-top:8px">[13] <b>Đại lý thuế; hoặc Tổ chức, cá nhân được ủy quyền khai thay (nếu có):</b> <span class="field-value"></span></div>`;
    }

    return `<div class="form-code">Mẫu số: <b>01/LPTB</b><br><span style="font-size:10pt">(Ban hành kèm theo Thông tư số 80/2021/TT-BTC ngày 29/9/2021 của Bộ Tài chính)</span><br><span style="font-size:9pt;font-style:italic">Mẫu này được sửa đổi, bổ sung bởi Điểm a, e, g Khoản 7 Điều 1 Thông tư 40/2025/TT-BTC<br>có hiệu lực từ ngày 01/07/2025 và Khoản 3 Điều 1 Thông tư 94/2025/TT-BTC có hiệu lực từ ngày 14/10/2025</span></div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">TỜ KHAI LỆ PHÍ TRƯỚC BẠ</div>
<div class="paper-subtitle">(Áp dụng đối với nhà, đất)</div>

<div class="field-row">[01] Kỳ tính thuế: Theo từng lần phát sinh ngày ${tp.d} tháng ${tp.m} năm ${tp.y}</div>
<div class="field-row">[02] Lần đầu: <span class="checkbox-inline">${iF?"✓":""}</span> &nbsp;&nbsp;&nbsp; [03] Bổ sung lần thứ: <span class="field-value" style="min-width:60px">${!iF?(data.supplementNumber||"..."):"…"}</span></div>

<div class="field-row" style="margin-top:8px">[04] <b>Người nộp thuế:</b> <span class="field-value">${data.taxpayerName||""}</span></div>
<div class="field-row">[05] Mã số thuế: <span class="tax-code-boxes">${tb(data.taxCode)}</span></div>
<div class="field-row">[06] Số CMND/CCCD/Định danh cá nhân/Hộ chiếu: <span class="field-value">${data.idNumber||""}</span></div>
<div class="field-row">[07] Địa chỉ: <span class="field-value">${data.taxpayerAddress||""}</span></div>
<div class="field-row">[08] Xã/phường/đặc khu: <span class="field-value">${data.ward||""}</span></div>
<div class="field-row">[09] Quận/huyện: <span class="field-value">${data.district||""}</span> &nbsp;&nbsp; [10] Tỉnh/TP: <span class="field-value">${data.province||""}</span></div>
<div class="field-row">[11] ĐT: <span class="field-value">${data.taxpayerPhone||""}</span> &nbsp; [12] Email: <span class="field-value">${data.taxpayerEmail||""}</span></div>

${agentSection}

<div style="margin-top:16px;font-weight:bold;text-decoration:underline">ĐẶC ĐIỂM NHÀ ĐẤT:</div>

<div class="field-row" style="margin-top:8px"><b>1. Đất:</b></div>
<div class="field-row" style="padding-left:20px">1.1. Thửa đất số: <span class="field-value">${data.parcelNumber||""}</span> &nbsp; Tờ bản đồ số: <span class="field-value">${data.mapNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">1.2. Địa chỉ:</div>
<div class="field-row" style="padding-left:40px">Số nhà: <span class="field-value">${data.houseNumber||""}</span> &nbsp; Tòa nhà: <span class="field-value">${data.building||""}</span> &nbsp; Ngõ/Hẻm: <span class="field-value">${data.alley||""}</span></div>
<div class="field-row" style="padding-left:40px">Đường/Phố: <span class="field-value">${data.street||""}</span> &nbsp; Thôn/xóm: <span class="field-value">${data.village||""}</span></div>
<div class="field-row" style="padding-left:40px">Phường/xã: <span class="field-value">${data.landWard||""}</span></div>
<div class="field-row" style="padding-left:40px">Quận/huyện: <span class="field-value">${data.landDistrict||""}</span> &nbsp; Tỉnh/TP: <span class="field-value">${data.landProvince||""}</span></div>
<div class="field-row" style="padding-left:20px">1.3. Vị trí: <span class="field-value">${pm[data.landPosition]||""}</span></div>
<div class="field-row" style="padding-left:20px">1.4. Mục đích SDĐ: <span class="field-value">${data.landPurpose||""}</span></div>
<div class="field-row" style="padding-left:20px">1.5. Diện tích (m²): <span class="field-value">${data.landArea||""}</span></div>
<div class="field-row" style="padding-left:20px">1.6. Nguồn gốc: <span class="field-value">${om[data.landOrigin]||""}</span></div>
<div class="field-row" style="padding-left:40px">- Tên người chuyển giao: <span class="field-value">${data.transferorName||""}</span></div>
<div class="field-row" style="padding-left:40px">- MST: <span class="field-value">${data.transferorTaxCode||""}</span> &nbsp; CMND/CCCD: <span class="field-value">${data.transferorId||""}</span></div>
<div class="field-row" style="padding-left:40px">- Địa chỉ: <span class="field-value">${data.transferorAddress||""}</span></div>
<div class="field-row" style="padding-left:40px">- Thời điểm chuyển giao: ngày ${td.d} tháng ${td.m} năm ${td.y}</div>
<div class="field-row" style="padding-left:20px">1.7. Giá trị đất chuyển giao: <span class="field-value">${vnd(data.landTransferValue)}</span></div>

<div class="field-row" style="margin-top:12px"><b>2. Nhà (nếu có):</b></div>
<div class="field-row" style="padding-left:20px">2.1. Cấp nhà/Hạng: <span class="field-value">${data.houseGrade||""}</span> &nbsp; Loại: <span class="field-value">${data.houseType||""}</span></div>
${data.isChungCu === "yes" ? `<div class="field-row" style="padding-left:20px;margin-top:4px"><i>Thông tin chung cư:</i></div>
<div class="field-row" style="padding-left:40px">Chủ dự án: <span class="field-value">${data.chungCuDeveloper||""}</span></div>
<div class="field-row" style="padding-left:40px">Kết cấu: <span class="field-value">${data.chungCuStructure||""}</span> &nbsp; Số tầng: <span class="field-value">${data.chungCuFloors||""}</span></div>
<div class="field-row" style="padding-left:40px">DT sở hữu chung: <span class="field-value">${data.chungCuSharedArea||""}</span> m² &nbsp; DT sở hữu riêng: <span class="field-value">${data.chungCuPrivateArea||""}</span> m²</div>` : ""}
<div class="field-row" style="padding-left:20px">DT xây dựng: <span class="field-value">${data.constructionArea||""}</span> m² &nbsp; DT sàn: <span class="field-value">${data.floorArea||""}</span> m²</div>
<div class="field-row" style="padding-left:20px">Nguồn gốc nhà: <span class="field-value">${data.houseOriginType==="tu_xay"?"Tự xây dựng":data.houseOriginType==="mua_thua_ke_tang"?"Mua/thừa kế/tặng cho":""}</span></div>
<div class="field-row" style="padding-left:20px">Giá trị nhà: <span class="field-value">${vnd(data.houseValue)}</span></div>

<div class="field-row" style="margin-top:12px"><b>3.</b> Hình thức nhận: Chuyển nhượng <span class="checkbox-inline">${ck(data.totalTransferType==="chuyen_nhuong")}</span> &nbsp; Thừa kế <span class="checkbox-inline">${ck(data.totalTransferType==="thua_ke")}</span> &nbsp; Tặng cho <span class="checkbox-inline">${ck(data.totalTransferType==="tang_cho")}</span></div>
<div class="field-row" style="padding-left:20px">Giá trị thực tế: <span class="field-value">${vnd(data.totalTransferValue)}</span></div>

${data.exemptionReason ? `<div class="field-row" style="margin-top:8px"><b>4.</b> Lý do miễn LPTB: <span class="field-value">${data.exemptionReason}</span></div>` : `<div class="field-row" style="margin-top:8px"><b>4.</b> Lý do miễn LPTB (nếu có): <span class="field-value" style="min-width:60%"></span></div>`}

<div class="field-row" style="margin-top:8px"><b>5. Thông tin đồng chủ sở hữu nhà, đất:</b></div>
${coOwners.length ? `<table class="form-table" style="width:100%;margin:6px 0;border-collapse:collapse;font-size:12pt">
<tr style="background:#f3f3f3"><th style="border:1px solid #333;padding:4px;width:40px">STT</th><th style="border:1px solid #333;padding:4px">Tên</th><th style="border:1px solid #333;padding:4px">MST</th><th style="border:1px solid #333;padding:4px">CMND/CCCD</th><th style="border:1px solid #333;padding:4px;width:80px">Tỷ lệ (%)</th></tr>
${coOwners.map((c,i) => `<tr><td style="border:1px solid #333;padding:4px;text-align:center">${i+1}</td><td style="border:1px solid #333;padding:4px">${c.name}</td><td style="border:1px solid #333;padding:4px">${c.taxCode}</td><td style="border:1px solid #333;padding:4px">${c.id}</td><td style="border:1px solid #333;padding:4px;text-align:center">${c.ratio}</td></tr>`).join("")}
</table>` : `<table class="form-table" style="width:100%;margin:6px 0;border-collapse:collapse;font-size:12pt">
<tr style="background:#f3f3f3"><th style="border:1px solid #333;padding:4px;width:40px">STT</th><th style="border:1px solid #333;padding:4px">Tên</th><th style="border:1px solid #333;padding:4px">MST</th><th style="border:1px solid #333;padding:4px">CMND/CCCD</th><th style="border:1px solid #333;padding:4px;width:80px">Tỷ lệ (%)</th></tr>
<tr><td style="border:1px solid #333;padding:4px;text-align:center">&nbsp;</td><td style="border:1px solid #333;padding:4px">&nbsp;</td><td style="border:1px solid #333;padding:4px">&nbsp;</td><td style="border:1px solid #333;padding:4px">&nbsp;</td><td style="border:1px solid #333;padding:4px">&nbsp;</td></tr>
</table>`}

<div class="field-row" style="margin-top:8px"><b>6.</b> Giấy tờ kèm:</div>
${rd.length ? rd.map(d2 => `<div class="field-row" style="padding-left:20px">- ${escapeHtml(d2)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">- <span class="field-value" style="min-width:90%"></span></div>`}

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan số liệu khai trên là đúng và chịu trách nhiệm trước pháp luật về những số liệu đã khai./.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:20px">
<div style="text-align:center;width:30%"><div class="signer-title">NHÂN VIÊN ĐẠI LÝ THUẾ</div><div class="signer-note">(Ký, ghi rõ họ tên,<br>chứng chỉ hành nghề)</div></div>
<div style="text-align:center;width:30%"><div class="signer-title">TỔ CHỨC, CÁ NHÂN<br>ĐƯỢC ỦY QUYỀN KHAI THAY</div><div class="signer-note">(Ký, ghi rõ họ tên)</div></div>
<div style="text-align:center;width:30%"><div class="date-line"><i>${data.signProvince||"……"}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</i></div><div class="signer-title">NGƯỜI NỘP THUẾ hoặc<br>ĐẠI DIỆN HỢP PHÁP CỦA NGƯỜI NỘP THUẾ</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:50px;font-weight:bold">${data.taxpayerName||""}</div></div>
</div>`;
}

function renderHopDongDatCoc(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const dd = fd(data.depositDate);
    const gd = fd(data.gcnDate);
    const bid = fd(data.buyerIdDate);
    const sid = fd(data.sellerIdDate);
    const vnd = (v) => v ? Number(v).toLocaleString("vi-VN") + " đồng" : "";
    const deadlineDays = data.notaryDeadline || "30";
    const defaultPenalty = "Nếu Bên A (bên đặt cọc) vi phạm thì mất số tiền đặt cọc. Nếu Bên B (bên nhận cọc) vi phạm thì phải trả lại tiền cọc và bồi thường thêm một khoản tiền bằng số tiền đặt cọc cho Bên A.";
    const penalty = data.penaltyTerms || defaultPenalty;

    return `<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">HỢP ĐỒNG ĐẶT CỌC</div>
<div class="paper-subtitle">(Mua bán bất động sản)</div>

<div class="field-row" style="margin-top:12px;text-align:center"><i>Hôm nay, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}, tại ${data.signPlace||"……"}</i></div>
<div class="field-row" style="margin-top:8px">Chúng tôi gồm:</div>

<div class="field-row" style="margin-top:10px;font-weight:bold">BÊN A (Bên đặt cọc — Bên mua):</div>
<div class="field-row" style="padding-left:20px">Ông/Bà: <span class="field-value">${data.buyerName||""}</span> &nbsp; Sinh năm: <span class="field-value">${data.buyerBirthYear||""}</span></div>
<div class="field-row" style="padding-left:20px">CMND/CCCD số: <span class="field-value">${data.buyerIdNumber||""}</span> &nbsp; cấp ngày ${bid.d}/${bid.m}/${bid.y} tại <span class="field-value">${data.buyerIdPlace||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.buyerAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">ĐT: <span class="field-value">${data.buyerPhone||""}</span></div>

<div class="field-row" style="margin-top:10px;font-weight:bold">BÊN B (Bên nhận đặt cọc — Bên bán):</div>
<div class="field-row" style="padding-left:20px">Ông/Bà: <span class="field-value">${data.sellerName||""}</span> &nbsp; Sinh năm: <span class="field-value">${data.sellerBirthYear||""}</span></div>
<div class="field-row" style="padding-left:20px">CMND/CCCD số: <span class="field-value">${data.sellerIdNumber||""}</span> &nbsp; cấp ngày ${sid.d}/${sid.m}/${sid.y} tại <span class="field-value">${data.sellerIdPlace||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.sellerAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">ĐT: <span class="field-value">${data.sellerPhone||""}</span></div>

<div class="field-row" style="margin-top:14px">Hai bên thỏa thuận ký kết hợp đồng đặt cọc với các điều khoản sau:</div>

<div class="field-row" style="margin-top:10px;font-weight:bold">ĐIỀU 1: BẤT ĐỘNG SẢN GIAO DỊCH</div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.propertyAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">Thửa đất số: <span class="field-value">${data.parcelNumber||""}</span> &nbsp; Tờ bản đồ số: <span class="field-value">${data.mapNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">Diện tích: <span class="field-value">${data.landArea||""}</span> m²</div>
<div class="field-row" style="padding-left:20px">GCN QSDĐ số: <span class="field-value">${data.gcnNumber||""}</span> &nbsp; Ngày cấp: ${gd.d}/${gd.m}/${gd.y}</div>
<div class="field-row" style="padding-left:20px">Mục đích sử dụng: <span class="field-value">${data.landPurpose||""}</span></div>

<div class="field-row" style="margin-top:10px;font-weight:bold">ĐIỀU 2: GIÁ BÁN VÀ TIỀN ĐẶT CỌC</div>
<div class="field-row" style="padding-left:20px">2.1. Giá bán thỏa thuận: <span class="field-value" style="font-weight:bold">${vnd(data.totalPrice)}</span></div>
<div class="field-row" style="padding-left:20px">2.2. Số tiền đặt cọc: <span class="field-value" style="font-weight:bold">${vnd(data.depositAmount)}</span></div>
<div class="field-row" style="padding-left:20px">2.3. Hình thức: <span class="field-value">${data.depositMethod==="chuyen_khoan"?"Chuyển khoản":"Tiền mặt"}</span></div>
${data.depositMethod === "chuyen_khoan" ? `<div class="field-row" style="padding-left:40px">STK: <span class="field-value">${data.bankAccount||""}</span> — NH: <span class="field-value">${data.bankName||""}</span></div>` : ""}
<div class="field-row" style="padding-left:20px">2.4. Ngày giao tiền cọc: ngày ${dd.d} tháng ${dd.m} năm ${dd.y}</div>
<div class="field-row" style="padding-left:20px">2.5. Số tiền còn lại: <span class="field-value">${vnd(data.totalPrice && data.depositAmount ? Number(data.totalPrice) - Number(data.depositAmount) : "")}</span> — thanh toán khi ký Hợp đồng chuyển nhượng tại Văn phòng công chứng.</div>

<div class="field-row" style="margin-top:10px;font-weight:bold">ĐIỀU 3: THỜI HẠN THỰC HIỆN</div>
<div class="field-row" style="padding-left:20px">Trong vòng <span class="field-value">${deadlineDays}</span> ngày kể từ ngày ký hợp đồng này, hai bên phải hoàn tất việc ký Hợp đồng chuyển nhượng QSDĐ tại Văn phòng Công chứng.</div>

<div class="field-row" style="margin-top:10px;font-weight:bold">ĐIỀU 4: TRÁCH NHIỆM VI PHẠM</div>
<div class="field-row" style="padding-left:20px">${penalty}</div>

<div class="field-row" style="margin-top:10px;font-weight:bold">ĐIỀU 5: CAM KẾT CHUNG</div>
<div class="field-row" style="padding-left:20px">- BĐS không có tranh chấp, không bị kê biên, không bị thế chấp (trừ trường hợp hai bên thỏa thuận).</div>
<div class="field-row" style="padding-left:20px">- Bên B cam kết có đầy đủ quyền định đoạt BĐS.</div>
<div class="field-row" style="padding-left:20px">- Hai bên cam kết thực hiện đúng các điều khoản trên.</div>
<div class="field-row" style="padding-left:20px">- Hợp đồng được lập thành 02 bản, mỗi bên giữ 01 bản, có giá trị pháp lý như nhau.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:30px">
<div style="text-align:center;width:45%"><div class="signer-title">BÊN A (Bên đặt cọc)</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.buyerName||""}</div></div>
<div style="text-align:center;width:45%"><div class="signer-title">BÊN B (Bên nhận đặt cọc)</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.sellerName||""}</div></div>
</div>`;
}

function renderGiayUyQuyen(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const gid = fd(data.granterIdDate);
    const eid = fd(data.granteeIdDate);
    const scopeMap = { ban: "bán / chuyển nhượng", mua: "mua / nhận chuyển nhượng", thu_tuc: "thực hiện thủ tục hành chính (đăng ký biến động, nộp thuế, lệ phí)", toan_phan: "toàn quyền giao dịch (bán, ký hợp đồng, nộp thuế, nhận tiền, đăng ký biến động)" };
    const scope = scopeMap[data.authScope] || "";
    const detail = data.authDetail || `Thực hiện các thủ tục liên quan đến việc ${scope} bất động sản tại địa chỉ nêu trên, bao gồm: ký hợp đồng, kê khai và nộp thuế, lệ phí, nộp hồ sơ đăng ký biến động tại Văn phòng đăng ký đất đai, và nhận kết quả.`;

    return `<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">GIẤY ỦY QUYỀN</div>
<div class="paper-subtitle">(Về việc ${scope} bất động sản)</div>

<div class="field-row" style="margin-top:12px;text-align:center"><i>Hôm nay, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}, tại ${data.signPlace||"……"}</i></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">BÊN ỦY QUYỀN (Bên A):</div>
<div class="field-row" style="padding-left:20px">Ông/Bà: <span class="field-value">${data.granterName||""}</span> &nbsp; Sinh năm: <span class="field-value">${data.granterBirthYear||""}</span></div>
<div class="field-row" style="padding-left:20px">CMND/CCCD số: <span class="field-value">${data.granterIdNumber||""}</span> &nbsp; cấp ngày ${gid.d}/${gid.m}/${gid.y} tại <span class="field-value">${data.granterIdPlace||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.granterAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">ĐT: <span class="field-value">${data.granterPhone||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">BÊN ĐƯỢC ỦY QUYỀN (Bên B):</div>
<div class="field-row" style="padding-left:20px">Ông/Bà: <span class="field-value">${data.granteeName||""}</span> &nbsp; Sinh năm: <span class="field-value">${data.granteeBirthYear||""}</span></div>
<div class="field-row" style="padding-left:20px">CMND/CCCD số: <span class="field-value">${data.granteeIdNumber||""}</span> &nbsp; cấp ngày ${eid.d}/${eid.m}/${eid.y} tại <span class="field-value">${data.granteeIdPlace||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.granteeAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">ĐT: <span class="field-value">${data.granteePhone||""}</span></div>
<div class="field-row" style="padding-left:20px">Mối quan hệ: <span class="field-value">${data.relationship||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">NỘI DUNG ỦY QUYỀN:</div>

<div class="field-row" style="margin-top:8px"><b>1. Bất động sản liên quan:</b></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.propertyAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">GCN QSDĐ số: <span class="field-value">${data.gcnNumber||""}</span></div>

<div class="field-row" style="margin-top:8px"><b>2. Phạm vi ủy quyền:</b></div>
<div class="field-row" style="padding-left:20px">Bên A ủy quyền cho Bên B thay mặt thực hiện việc <span class="field-value">${scope}</span> đối với bất động sản nêu trên.</div>

<div class="field-row" style="margin-top:8px"><b>3. Chi tiết quyền hạn:</b></div>
<div class="field-row" style="padding-left:20px"><span class="field-value" style="display:block;min-width:95%">${detail}</span></div>

<div class="field-row" style="margin-top:8px"><b>4. Thời hạn ủy quyền:</b> <span class="field-value">${data.authDuration||"Cho đến khi hoàn tất thủ tục"}</span></div>

<div class="field-row" style="margin-top:8px"><b>5. Ủy quyền lại:</b> Bên B <span class="field-value">${data.canDelegate==="yes"?"ĐƯỢC":"KHÔNG được"}</span> ủy quyền lại cho người thứ ba.</div>

<div class="field-row" style="margin-top:8px"><b>6. Cam kết:</b></div>
<div class="field-row" style="padding-left:20px">- Bên A cam kết ủy quyền hoàn toàn tự nguyện, không bị ép buộc.</div>
<div class="field-row" style="padding-left:20px">- Bên B cam kết thực hiện đúng phạm vi ủy quyền và bảo vệ quyền lợi Bên A.</div>
<div class="field-row" style="padding-left:20px">- Giấy ủy quyền này có hiệu lực kể từ ngày ký (và công chứng, nếu có).</div>

<div class="field-row" style="margin-top:12px;font-style:italic;text-align:center">Giấy ủy quyền được lập thành 02 bản, mỗi bên giữ 01 bản.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:30px">
<div style="text-align:center;width:45%"><div class="signer-title">BÊN ỦY QUYỀN (Bên A)</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.granterName||""}</div></div>
<div style="text-align:center;width:45%"><div class="signer-title">BÊN ĐƯỢC ỦY QUYỀN (Bên B)</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.granteeName||""}</div></div>
</div>

<div class="field-row" style="margin-top:20px;text-align:center;font-style:italic;font-size:11pt;color:#666">Lưu ý: Giấy ủy quyền về bất động sản phải được CÔNG CHỨNG tại Văn phòng Công chứng mới có giá trị pháp lý (Điều 42, 43 Luật Công chứng 2024).</div>`;
}

// ================================================================
// RENDER: Mẫu 03a — Xóa đăng ký biện pháp bảo đảm
// ================================================================
function renderMau03aXoaDK(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const rd = fd(data.registrationDate);
    const roleMap = { ben_nhan_bao_dam: "Bên nhận bảo đảm", ben_bao_dam: "Bên bảo đảm", ben_mua_tai_san: "Bên mua tài sản bảo đảm", ke_thua_quyen: "Người kế thừa quyền", co_quan_thi_hanh: "Cơ quan thi hành án", nguoi_uy_quyen: "Người được ủy quyền", khac: "Tổ chức/cá nhân khác" };
    const role = roleMap[data.requesterRole] || "";
    const ck = (v, target) => v === target ? "☑" : "☐";
    const docs = [data.attachDoc1, data.attachDoc2, data.attachDoc3].filter(Boolean);

    return `<div class="form-code">Mẫu số 03a</div>
<div class="form-code" style="font-size:9pt;margin-top:2px">(Ban hành kèm theo Nghị định số 99/2022/NĐ-CP)</div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">PHIẾU YÊU CẦU XÓA ĐĂNG KÝ</div>
<div class="paper-subtitle">Biện pháp bảo đảm bằng quyền sử dụng đất, tài sản gắn liền với đất</div>

<div class="field-row" style="margin-top:14px"><b>Kính gửi:</b> <span class="field-value">${data.registrationOrg||"Văn phòng đăng ký đất đai ..."}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">I. NGƯỜI YÊU CẦU XÓA ĐĂNG KÝ</div>
<div class="field-row" style="padding-left:20px">Tư cách: <span class="field-value">${role}</span></div>
<div class="field-row" style="padding-left:20px">Họ và tên: <span class="field-value" style="text-transform:uppercase">${data.requesterName||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ liên hệ: <span class="field-value">${data.requesterAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">Điện thoại: <span class="field-value">${data.requesterPhone||""}</span> &nbsp; Fax: <span class="field-value">${data.requesterFax||""}</span> &nbsp; Email: <span class="field-value">${data.requesterEmail||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">II. YÊU CẦU XÓA ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM</div>
<div class="field-row" style="padding-left:20px">Số đăng ký: <span class="field-value">${data.registrationNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">Ngày đăng ký: ngày ${rd.d} tháng ${rd.m} năm ${rd.y}</div>
<div class="field-row" style="padding-left:20px">Cơ quan đã đăng ký: <span class="field-value">${data.registrationOrg||""}</span></div>

<div class="field-row" style="margin-top:10px;padding-left:20px"><b>Căn cứ xóa đăng ký:</b></div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.deleteReason||""}</span></div>

<div class="field-row" style="margin-top:10px;padding-left:20px">Đề nghị miễn phí đăng ký: ${ck(data.feeExempt, "yes")} Có &nbsp;&nbsp; ${ck(data.feeExempt, "no")} Không</div>

<div class="field-row" style="margin-top:12px;font-weight:bold">III. GIẤY TỜ KÈM THEO</div>
${docs.length ? docs.map((dc, i) => `<div class="field-row" style="padding-left:20px">(${i+1}) ${escapeHtml(dc)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">(1) <span class="field-value" style="min-width:80%"></span></div>
<div class="field-row" style="padding-left:20px">(2) <span class="field-value" style="min-width:80%"></span></div>`}

<div class="field-row" style="margin-top:12px;font-weight:bold">IV. CÁCH THỨC NHẬN KẾT QUẢ</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "truc_tiep")} Trực tiếp tại cơ quan đăng ký</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "buu_dien")} Qua đường bưu điện</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "fax_email")} Fax / Email</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "phuong_thuc_khac")} Phương thức khác</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:24px">
<div style="text-align:center;width:45%"><div class="signer-title">XÁC NHẬN CỦA CƠ QUAN ĐĂNG KÝ</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">NGƯỜI YÊU CẦU XÓA ĐĂNG KÝ</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.requesterName||""}</div></div>
</div>`;
}

// ================================================================
// RENDER: Mẫu 01a — Đăng ký biện pháp bảo đảm (NĐ 99/2022)
// ================================================================
function renderMau01aDKBaoDam(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const cd = fd(data.contractDate);
    const gd = fd(data.gcnDate);
    const roleMap = { ben_nhan_bao_dam: "Bên nhận bảo đảm", ben_bao_dam: "Bên bảo đảm", nguoi_uy_quyen: "Người được ủy quyền" };
    const role = roleMap[data.requesterRole] || "";
    const ck = (v, target) => v === target ? "☑" : "☐";
    const gtMap = { the_chap: "Thế chấp quyền sử dụng đất và tài sản gắn liền với đất", the_chap_dat: "Thế chấp quyền sử dụng đất", the_chap_tai_san: "Thế chấp tài sản gắn liền với đất" };
    const gtLabel = gtMap[data.guaranteeType] || "";
    const docs = [data.attachDoc1, data.attachDoc2, data.attachDoc3].filter(Boolean);

    return `<div class="form-code">Mẫu số 01a</div>
<div class="form-code" style="font-size:9pt;margin-top:2px">(Ban hành kèm theo Nghị định số 99/2022/NĐ-CP)</div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">PHIẾU YÊU CẦU ĐĂNG KÝ</div>
<div class="paper-subtitle">Biện pháp bảo đảm bằng quyền sử dụng đất, tài sản gắn liền với đất</div>

<div class="field-row" style="margin-top:14px"><b>Kính gửi:</b> <span class="field-value">${data.registrationOrg||"Văn phòng đăng ký đất đai ..."}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">I. NGƯỜI YÊU CẦU ĐĂNG KÝ</div>
<div class="field-row" style="padding-left:20px">Tư cách: <span class="field-value">${role}</span></div>
<div class="field-row" style="padding-left:20px">Họ và tên / Tên tổ chức: <span class="field-value" style="text-transform:uppercase">${data.requesterName||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.requesterAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">ĐT: <span class="field-value">${data.requesterPhone||""}</span> &nbsp; Fax: <span class="field-value">${data.requesterFax||""}</span> &nbsp; Email: <span class="field-value">${data.requesterEmail||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">II. BÊN BẢO ĐẢM</div>
<div class="field-row" style="padding-left:20px">Họ và tên: <span class="field-value" style="text-transform:uppercase">${data.guarantorName||""}</span></div>
<div class="field-row" style="padding-left:20px">CMND/CCCD số: <span class="field-value">${data.guarantorIdNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.guarantorAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">Điện thoại: <span class="field-value">${data.guarantorPhone||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">III. BÊN NHẬN BẢO ĐẢM</div>
<div class="field-row" style="padding-left:20px">Tên tổ chức: <span class="field-value" style="text-transform:uppercase">${data.lenderName||""}</span></div>
<div class="field-row" style="padding-left:20px">MST / Số ĐKKD: <span class="field-value">${data.lenderTaxCode||""}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.lenderAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">Người đại diện: <span class="field-value">${data.lenderRepName||""}</span> &nbsp; Chức vụ: <span class="field-value">${data.lenderRepTitle||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">IV. TÀI SẢN BẢO ĐẢM</div>
<div class="field-row" style="padding-left:20px">Địa chỉ BĐS: <span class="field-value">${data.propertyAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">Thửa đất số: <span class="field-value">${data.parcelNumber||""}</span> &nbsp; Tờ bản đồ số: <span class="field-value">${data.mapNumber||""}</span> &nbsp; Diện tích: <span class="field-value">${data.landArea||""}</span> m²</div>
<div class="field-row" style="padding-left:20px">Mục đích SDĐ: <span class="field-value">${data.landPurpose||""}</span></div>
<div class="field-row" style="padding-left:20px">GCN QSDĐ số: <span class="field-value">${data.gcnNumber||""}</span> &nbsp; cấp ngày ${gd.d} tháng ${gd.m} năm ${gd.y}</div>
${data.hasHouse ? `<div class="field-row" style="padding-left:20px">Tài sản gắn liền trên đất: <span class="field-value">${data.hasHouse}</span></div>` : ""}

<div class="field-row" style="margin-top:12px;font-weight:bold">V. NỘI DUNG ĐĂNG KÝ BIỆN PHÁP BẢO ĐẢM</div>
<div class="field-row" style="padding-left:20px">Biện pháp bảo đảm: <span class="field-value">${gtLabel}</span></div>
<div class="field-row" style="padding-left:20px">Hợp đồng thế chấp số: <span class="field-value">${data.contractNumber||""}</span> &nbsp; ngày ${cd.d} tháng ${cd.m} năm ${cd.y}</div>
<div class="field-row" style="padding-left:20px">Công chứng tại: <span class="field-value">${data.notaryOrg||""}</span> &nbsp; Số CC: <span class="field-value">${data.notaryNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">Nghĩa vụ được bảo đảm:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.obligation||""}</span></div>
<div class="field-row" style="padding-left:20px">Thời hạn bảo đảm: <span class="field-value">${data.guaranteeTerm||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">VI. GIẤY TỜ KÈM THEO</div>
${docs.length ? docs.map((dc, i) => `<div class="field-row" style="padding-left:20px">(${i+1}) ${escapeHtml(dc)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">(1) <span class="field-value" style="min-width:80%"></span></div>
<div class="field-row" style="padding-left:20px">(2) <span class="field-value" style="min-width:80%"></span></div>`}

<div class="field-row" style="margin-top:12px;font-weight:bold">VII. CÁCH THỨC NHẬN KẾT QUẢ</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "truc_tiep")} Trực tiếp tại cơ quan đăng ký</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "buu_dien")} Qua đường bưu điện</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "fax_email")} Fax / Email</div>
<div class="field-row" style="padding-left:20px">${ck(data.resultMethod, "phuong_thuc_khac")} Phương thức khác</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:24px">
<div style="text-align:center;width:45%"><div class="signer-title">XÁC NHẬN CỦA CƠ QUAN ĐĂNG KÝ</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">NGƯỜI YÊU CẦU ĐĂNG KÝ</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.requesterName||""}</div></div>
</div>`;
}

// ================================================================
// RENDER: Mẫu số 21 — Tách thửa / Hợp thửa (NĐ 151/2025)
// ================================================================
function renderMau21(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const itm = { cmnd: "CMND", cccd: "CCCD", dinh_danh: "Định danh cá nhân", hochieu: "Hộ chiếu", gpkd: "GPKD" };
    const il = itm[data.idType] || "";
    const it = il && data.idNumber ? `${il} số: ${data.idNumber}` : data.idNumber || "";
    const typeMap = { tach: "Tách thửa đất", hop: "Hợp thửa đất", tach_hop: "Tách thửa + hợp thửa đồng thời" };
    const requestLabel = typeMap[data.requestType] || "Tách thửa đất";
    const ck = (v, target) => v === target ? "☑" : "☐";
    const docs = [data.attachDoc1, data.attachDoc2, data.attachDoc3].filter(Boolean);

    return `<div class="form-code">Mẫu số 21</div>
<div class="form-code" style="font-size:9pt;margin-top:2px">(Ban hành kèm theo Nghị định số 151/2025/NĐ-CP)</div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">ĐƠN ĐỀ NGHỊ TÁCH THỬA ĐẤT, HỢP THỬA ĐẤT</div>
<div class="paper-recipient">Kính gửi: <span class="field-value">${data.recipient||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold">I. PHẦN KÊ KHAI CỦA NGƯỜI SỬ DỤNG ĐẤT</div>

<div class="field-row" style="margin-top:10px"><b>1. Người sử dụng đất</b></div>
<div class="field-row" style="padding-left:20px">1.1. Tên <i>(viết chữ in hoa)</i>: <span class="field-value">${(data.fullName||"").toUpperCase()}</span></div>
<div class="field-row" style="padding-left:20px">1.2. Giấy tờ nhân thân: <span class="field-value">${it}</span></div>
<div class="field-row" style="padding-left:20px">1.3. Địa chỉ: <span class="field-value">${data.address||""}</span></div>
<div class="field-row" style="padding-left:20px">1.4. Điện thoại: <span class="field-value">${data.phone||""}</span> &nbsp;&nbsp; Email: <span class="field-value">${data.email||""}</span></div>

<div class="field-row" style="margin-top:12px"><b>2. Nội dung tách thửa / hợp thửa</b></div>
<div class="field-row" style="padding-left:20px">Loại yêu cầu: <span class="field-value">${requestLabel}</span></div>
<div class="field-row" style="padding-left:20px">Thửa đất số: <span class="field-value">${data.parcelNumber||""}</span> &nbsp; Tờ bản đồ số: <span class="field-value">${data.mapNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">Diện tích: <span class="field-value">${data.landArea||""}</span> m² &nbsp; Loại đất: <span class="field-value">${data.landUse||""}</span></div>
<div class="field-row" style="padding-left:20px">GCN đã cấp số: <span class="field-value">${data.gcnNumber||""}</span></div>

${data.requestType !== "hop" ? `<div class="field-row" style="padding-left:20px;margin-top:8px"><b>Đề nghị tách thành:</b> <span class="field-value">${data.splitCount||""}</span> thửa</div>
<div class="field-row" style="padding-left:20px">Chi tiết:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.splitDetail||""}</span></div>` : ""}

<div class="field-row" style="padding-left:20px;margin-top:8px">Lý do: <span class="field-value" style="display:block;min-width:95%;margin-top:4px">${data.splitReason||""}</span></div>

<div class="field-row" style="margin-top:12px"><b>3. Giấy tờ nộp kèm theo</b></div>
${docs.length ? docs.map((dc, i) => `<div class="field-row" style="padding-left:20px">(${i+1}) ${escapeHtml(dc)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">(1) <span class="field-value" style="min-width:80%"></span></div>
<div class="field-row" style="padding-left:20px">(2) <span class="field-value" style="min-width:80%"></span></div>`}

<div class="field-row" style="margin-top:10px;padding-left:20px"><b>4. Đề nghị cấp GCN cho thửa đất mới:</b> ${ck(data.requestGCN, "yes")} Có &nbsp;&nbsp; ${ck(data.requestGCN, "no")} Không</div>

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan nội dung kê khai trên đơn là đúng sự thật, đề nghị được tách thửa / hợp thửa theo quy định của pháp luật.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:20px">
<div style="text-align:center;width:45%"><div class="signer-title">Ý KIẾN CỦA CƠ QUAN ĐĂNG KÝ ĐĐ</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">Người đề nghị</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.fullName||""}</div></div>
</div>`;
}

// ================================================================
// RENDER: Mẫu số 04 — Đăng ký đất đai lần đầu (NĐ 151/2025)
// ================================================================
function renderMau04ND151(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const itm = { cmnd: "CMND", cccd: "CCCD", dinh_danh: "Định danh cá nhân", hochieu: "Hộ chiếu", gpkd: "GPKD" };
    const il = itm[data.idType] || "";
    const it = il && data.idNumber ? `${il} số: ${data.idNumber}` : data.idNumber || "";
    const ck = (v, target) => v === target ? "☑" : "☐";
    const houseMap = { biet_thu: "Biệt thự", nha_rieng_le: "Nhà ở riêng lẻ", can_ho: "Căn hộ chung cư", khac: "Công trình khác" };
    const ownMap = { rieng: "Sở hữu riêng", chung: "Sở hữu chung" };
    const docs = [data.attachDoc1, data.attachDoc2, data.attachDoc3, data.attachDoc4].filter(Boolean);
    const showHouse = data.hasBuilding === "yes";

    return `<div class="form-code">Mẫu số 04</div>
<div class="form-code" style="font-size:9pt;margin-top:2px">(Ban hành kèm theo Nghị định số 151/2025/NĐ-CP)</div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">ĐƠN ĐĂNG KÝ ĐẤT ĐAI, TÀI SẢN GẮN LIỀN VỚI ĐẤT</div>
<div class="paper-subtitle">(Đăng ký lần đầu)</div>
<div class="paper-recipient">Kính gửi: <span class="field-value">${data.recipient||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold">I. PHẦN KÊ KHAI CỦA NGƯỜI ĐĂNG KÝ</div>

<div class="field-row" style="margin-top:10px"><b>1. Người sử dụng đất / Chủ sở hữu tài sản gắn liền với đất</b></div>
<div class="field-row" style="padding-left:20px">1.1. Tên <i>(viết chữ in hoa)</i>: <span class="field-value">${(data.fullName||"").toUpperCase()}</span></div>
<div class="field-row" style="padding-left:20px">1.2. Giấy tờ nhân thân: <span class="field-value">${it}</span></div>
<div class="field-row" style="padding-left:20px">1.3. Địa chỉ: <span class="field-value">${data.address||""}</span></div>
<div class="field-row" style="padding-left:20px">1.4. Điện thoại: <span class="field-value">${data.phone||""}</span> &nbsp;&nbsp; Email: <span class="field-value">${data.email||""}</span></div>

<div class="field-row" style="margin-top:12px"><b>2. Thửa đất đăng ký</b></div>
<div class="field-row" style="padding-left:20px">2.1. Thửa đất số: <span class="field-value">${data.parcelNumber||""}</span> &nbsp; Tờ bản đồ số: <span class="field-value">${data.mapNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">2.2. Địa chỉ thửa đất: <span class="field-value">${data.parcelAddress||""}</span></div>
<div class="field-row" style="padding-left:20px">2.3. Diện tích: <span class="field-value">${data.landAreaTotal||""}</span> m²${data.landAreaPrivate ? ` (riêng: ${data.landAreaPrivate} m²)` : ""}${data.landAreaShared ? ` (chung: ${data.landAreaShared} m²)` : ""}</div>
<div class="field-row" style="padding-left:20px">2.4. Mục đích sử dụng đất: <span class="field-value">${data.landPurpose||""}</span></div>
<div class="field-row" style="padding-left:20px">2.5. Thời hạn sử dụng đất: <span class="field-value">${data.landDuration||""}</span></div>
<div class="field-row" style="padding-left:20px">2.6. Nguồn gốc sử dụng đất:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.landOrigin||""}</span></div>

${showHouse ? `<div class="field-row" style="margin-top:12px"><b>3. Nhà ở, tài sản gắn liền với đất</b></div>
<div class="field-row" style="padding-left:20px">3.1. Loại nhà ở: <span class="field-value">${houseMap[data.houseType]||""}</span></div>
<div class="field-row" style="padding-left:20px">3.2. Diện tích xây dựng: <span class="field-value">${data.houseAreaBuilt||""}</span> m²</div>
<div class="field-row" style="padding-left:20px">3.3. Diện tích sàn: <span class="field-value">${data.houseAreaFloor||""}</span> m²</div>
<div class="field-row" style="padding-left:20px">3.4. Số tầng: <span class="field-value">${data.houseFloors||""}</span></div>
<div class="field-row" style="padding-left:20px">Hình thức sở hữu: <span class="field-value">${ownMap[data.houseOwnership]||""}</span></div>
<div class="field-row" style="padding-left:20px">3.5. Nguồn gốc:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.houseOrigin||""}</span></div>` : ""}

<div class="field-row" style="margin-top:12px"><b>4. Đề nghị</b></div>
<div class="field-row" style="padding-left:20px">${ck(data.requestRegister, "yes")} Đăng ký quyền sử dụng đất</div>
<div class="field-row" style="padding-left:20px">${ck(data.requestGCN, "yes")} Cấp Giấy chứng nhận quyền sử dụng đất</div>
<div class="field-row" style="padding-left:20px">${ck(data.requestDebt, "yes")} Ghi nợ tiền sử dụng đất</div>
${data.requestOther ? `<div class="field-row" style="padding-left:20px">☑ Khác: <span class="field-value">${data.requestOther}</span></div>` : `<div class="field-row" style="padding-left:20px">☐ Khác: <span class="field-value" style="min-width:60%"></span></div>`}

<div class="field-row" style="margin-top:12px"><b>5. Giấy tờ nộp kèm</b></div>
${docs.length ? docs.map((dc, i) => `<div class="field-row" style="padding-left:20px">(${i+1}) ${escapeHtml(dc)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">(1) <span class="field-value" style="min-width:80%"></span></div>
<div class="field-row" style="padding-left:20px">(2) <span class="field-value" style="min-width:80%"></span></div>`}

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan nội dung kê khai trên đơn là đúng sự thật, đề nghị được đăng ký theo quy định của pháp luật.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:20px">
<div style="text-align:center;width:45%"><div class="signer-title">XÁC NHẬN CỦA UBND XÃ/PHƯỜNG</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">Người đăng ký</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.fullName||""}</div></div>
</div>`;
}

// ================================================================
// RENDER: Mẫu số 23 — Điều chỉnh QĐ chuyển MĐSDĐ (NĐ 151/2025)
// ================================================================
function renderMau23(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const dd = fd(data.decisionDate);
    const docs = [data.attachDoc1, data.attachDoc2, data.attachDoc3].filter(Boolean);

    return `<div class="form-code">Mẫu số 23</div>
<div class="form-code" style="font-size:9pt;margin-top:2px">(Ban hành kèm theo Nghị định số 151/2025/NĐ-CP)</div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">ĐƠN ĐỀ NGHỊ ĐIỀU CHỈNH QUYẾT ĐỊNH</div>
<div class="paper-subtitle">Giao đất / Cho thuê đất / Cho phép chuyển mục đích sử dụng đất</div>
<div class="paper-recipient">Kính gửi: <span class="field-value">${data.recipient||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold">I. NGƯỜI ĐỀ NGHỊ</div>
<div class="field-row" style="padding-left:20px">Tên <i>(viết chữ in hoa)</i>: <span class="field-value">${(data.fullName||"").toUpperCase()}</span></div>
<div class="field-row" style="padding-left:20px">Địa chỉ: <span class="field-value">${data.address||""}</span></div>
<div class="field-row" style="padding-left:20px">Điện thoại: <span class="field-value">${data.phone||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">II. THÔNG TIN QUYẾT ĐỊNH ĐÃ CÓ</div>
<div class="field-row" style="padding-left:20px">Quyết định số: <span class="field-value">${data.decisionNumber||""}</span></div>
<div class="field-row" style="padding-left:20px">Ngày ký: ngày ${dd.d} tháng ${dd.m} năm ${dd.y}</div>
<div class="field-row" style="padding-left:20px">Cơ quan ban hành: <span class="field-value">${data.decisionIssuer||""}</span></div>
<div class="field-row" style="padding-left:20px">Nội dung chính:</div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.decisionContent||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">III. NỘI DUNG ĐỀ NGHỊ ĐIỀU CHỈNH</div>
<div class="field-row" style="padding-left:20px"><b>1. Lý do đề nghị điều chỉnh:</b></div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.adjustReason||""}</span></div>
<div class="field-row" style="padding-left:20px;margin-top:8px"><b>2. Nội dung cụ thể đề nghị điều chỉnh:</b></div>
<div class="field-row" style="padding-left:30px"><span class="field-value" style="display:block;min-width:95%">${data.adjustDetail||""}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">IV. CAM KẾT</div>
<div class="field-row" style="padding-left:20px"><span class="field-value" style="display:block;min-width:95%">${data.adjustCommitment||"Tôi cam đoan nội dung đề nghị trên là đúng sự thật và chịu trách nhiệm trước pháp luật về các thông tin đã kê khai."}</span></div>

<div class="field-row" style="margin-top:12px;font-weight:bold">V. TÀI LIỆU KÈM THEO</div>
${docs.length ? docs.map((dc, i) => `<div class="field-row" style="padding-left:20px">(${i+1}) ${escapeHtml(dc)}</div>`).join("") : `<div class="field-row" style="padding-left:20px">(1) <span class="field-value" style="min-width:80%"></span></div>
<div class="field-row" style="padding-left:20px">(2) <span class="field-value" style="min-width:80%"></span></div>`}

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:24px">
<div style="text-align:center;width:45%"><div class="signer-title">XÁC NHẬN CỦA CƠ QUAN</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">Người đề nghị</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.fullName||""}</div></div>
</div>`;
}

// ================================================================
// RENDER: Mẫu 01/BĐS — Tờ khai thuế cho thuê BĐS
// ================================================================
function renderMau01BDS(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const cf = fd(data.contractFrom);
    const ct = fd(data.contractTo);
    const vnd = (v) => v ? Number(String(v).replace(/\D/g, "")).toLocaleString("vi-VN") + " đồng" : "";
    const tb = (c) => { const dg = (c||"").replace(/\D/g,"").split(""); const pt = [1,1,1,1,1,1,1,1,1,1,"s",1,1,1]; let i=0; return pt.map(p => p==="s"?`<span class="tax-code-box separator">-</span>`:`<span class="tax-code-box">${dg[i++]??""}</span>`).join(""); };
    const periodMap = { nam: "Cả năm", "6thang_1": "6 tháng đầu năm", "6thang_2": "6 tháng cuối năm" };
    const typeMap = { nha_o: "Nhà ở", mat_bang: "Mặt bằng kinh doanh", can_ho: "Căn hộ chung cư", dat_trong: "Đất trống", kho_xuong: "Kho/Xưởng", khac: "Loại khác" };
    const isAbove = data.revenueThreshold === "yes";

    return `<div class="form-code">Mẫu số: <b>01/BĐS</b><br><span style="font-size:10pt">(Ban hành kèm theo Thông tư số 80/2021/TT-BTC ngày 29/9/2021 của Bộ Tài chính)</span></div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">TỜ KHAI THUẾ ĐỐI VỚI HOẠT ĐỘNG CHO THUÊ TÀI SẢN</div>
<div class="paper-subtitle">(Áp dụng cho cá nhân có thu nhập từ cho thuê bất động sản — NĐ 144/2026/NĐ-CP)</div>

<div class="field-row" style="margin-top:12px">[01] Kỳ tính thuế: Năm <span class="field-value">${data.taxYear||"……"}</span> — Kỳ kê khai: <span class="field-value">${periodMap[data.filingPeriod]||"……"}</span></div>
<div class="field-row">[02] Lần đầu: <span class="checkbox-inline">${data.filingType==="lan_dau"?"✓":""}</span> &nbsp;&nbsp; Bổ sung: <span class="checkbox-inline">${data.filingType==="bo_sung"?"✓":""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">I. THÔNG TIN NGƯỜI NỘP THUẾ</div>
<div class="field-row" style="margin-top:8px">[03] <b>Họ và tên:</b> <span class="field-value">${(data.fullName||"").toUpperCase()}</span></div>
<div class="field-row">[04] Mã số thuế: <span class="tax-code-boxes">${tb(data.taxCode)}</span></div>
<div class="field-row">[05] Số CMND/CCCD: <span class="field-value">${data.idNumber||""}</span></div>
<div class="field-row">[06] Địa chỉ cư trú: <span class="field-value">${data.address||""}</span></div>
<div class="field-row">[07] Điện thoại: <span class="field-value">${data.phone||""}</span> &nbsp; Email: <span class="field-value">${data.email||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">II. THÔNG TIN BẤT ĐỘNG SẢN CHO THUÊ</div>
<div class="field-row" style="margin-top:8px">[08] Địa chỉ BĐS cho thuê: <span class="field-value">${data.bdsAddress1||""}</span></div>
<div class="field-row">[09] Loại BĐS: <span class="field-value">${typeMap[data.bdsType1]||""}</span> &nbsp; Diện tích: <span class="field-value">${data.bdsArea1||""}</span> m²</div>
<div class="field-row">[10] Bên thuê: <span class="field-value">${data.tenantName1||""}</span> &nbsp; MST/CCCD: <span class="field-value">${data.tenantId1||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">III. HỢP ĐỒNG VÀ DOANH THU</div>
<div class="field-row" style="margin-top:8px">[11] Hợp đồng cho thuê số: <span class="field-value">${data.contractNumber||""}</span></div>
<div class="field-row">[12] Thời hạn thuê: từ ngày ${cf.d}/${cf.m}/${cf.y} đến ngày ${ct.d}/${ct.m}/${ct.y}</div>
<div class="field-row">[13] Giá thuê/tháng: <span class="field-value">${vnd(data.monthlyRent)}</span></div>
<div class="field-row">[14] <b>Tổng doanh thu cho thuê/năm:</b> <span class="field-value" style="font-weight:bold">${vnd(data.annualRevenue)}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">IV. XÁC ĐỊNH NGHĨA VỤ THUẾ</div>
<div class="field-row" style="margin-top:8px">[15] Ngưỡng doanh thu: <b>1.000.000.000 đồng/năm</b> (NĐ 144/2026/NĐ-CP)</div>
<div class="field-row">[16] Doanh thu có vượt ngưỡng: <span class="field-value" style="font-weight:bold">${isAbove ? "CÓ — phát sinh thuế" : "KHÔNG — không phát sinh thuế"}</span></div>

${isAbove ? `<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">V. TÍNH THUẾ</div>
<div class="field-row" style="margin-top:8px">[17] Doanh thu chịu thuế: <span class="field-value">${vnd(data.taxableRevenue)}</span></div>
<div class="field-row">[18] Thuế GTGT: <span class="field-value">${data.vatRate||"5"}</span>% × doanh thu = <span class="field-value" style="font-weight:bold">${vnd(data.vatAmount)}</span></div>
<div class="field-row">[19] Thuế TNCN: <span class="field-value">${data.pitRate||"5"}</span>% × doanh thu = <span class="field-value" style="font-weight:bold">${vnd(data.pitAmount)}</span></div>
<div class="field-row"><b>[20] Tổng thuế phải nộp:</b> <span class="field-value" style="font-weight:bold;font-size:14pt">${vnd(data.totalTax)}</span></div>` :
`<div class="field-row" style="margin-top:14px;font-weight:bold;text-decoration:underline">V. TÍNH THUẾ</div>
<div class="field-row" style="margin-top:8px;color:#059669;font-weight:bold">[17] Doanh thu ≤ 1 tỷ đồng/năm → Không phải nộp thuế GTGT và thuế TNCN</div>
<div class="field-row" style="color:#059669">(Căn cứ: Nghị định 144/2026/NĐ-CP)</div>`}

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan số liệu khai trên là đúng sự thật và chịu trách nhiệm trước pháp luật về những số liệu đã khai./.</div>

<div class="signature-area" style="display:flex;justify-content:space-between;margin-top:24px">
<div style="text-align:center;width:45%"><div class="signer-title">XÁC NHẬN CỦA CƠ QUAN THUẾ</div><div class="signer-note">(Ký, đóng dấu)</div></div>
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">NGƯỜI NỘP THUẾ</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.fullName||""}</div></div>
</div>`;
}

// ================================================================
// RENDER: Mẫu 01/BK-BĐS — Bảng kê chi tiết BĐS cho thuê
// ================================================================
function renderMau01BKBDS(data) {
    const fd = (s) => { if (!s) return { d: "...", m: "...", y: "..." }; const x = new Date(s); return { d: x.getDate(), m: x.getMonth()+1, y: x.getFullYear() }; };
    const sd = fd(data.signDate);
    const vnd = (v) => v ? Number(String(v).replace(/\D/g, "")).toLocaleString("vi-VN") : "";
    const periodMap = { nam: "Cả năm", "6thang_1": "6 tháng đầu năm", "6thang_2": "6 tháng cuối năm" };
    const typeMap = { nha_o: "Nhà ở", mat_bang: "Mặt bằng KD", can_ho: "Căn hộ", dat_trong: "Đất trống", kho_xuong: "Kho/Xưởng", khac: "Khác" };

    const rows = [];
    for (let i = 1; i <= 2; i++) {
        const addr = data[`bds${i}Address`];
        if (addr) {
            rows.push({
                stt: i,
                address: addr,
                type: typeMap[data[`bds${i}Type`]] || "",
                area: data[`bds${i}Area`] || "",
                tenant: data[`bds${i}Tenant`] || "",
                tenantId: data[`bds${i}TenantId`] || "",
                contractNo: data[`bds${i}ContractNo`] || "",
                from: fd(data[`bds${i}From`]),
                to: fd(data[`bds${i}To`]),
                monthly: vnd(data[`bds${i}Monthly`]),
                annual: vnd(data[`bds${i}Annual`]),
            });
        }
    }

    return `<div class="form-code">Mẫu số: <b>01/BK-BĐS</b><br><span style="font-size:10pt">(Phụ lục Bảng kê chi tiết bất động sản cho thuê — kèm theo Mẫu 01/BĐS)</span></div>
<div class="paper-header"><div class="republic">CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM</div><div class="motto">Độc lập - Tự do - Hạnh phúc</div><div class="motto-line"></div></div>
<div class="paper-title">BẢNG KÊ CHI TIẾT BẤT ĐỘNG SẢN CHO THUÊ</div>
<div class="paper-subtitle">(Kèm theo Tờ khai thuế Mẫu 01/BĐS)</div>

<div class="field-row" style="margin-top:12px">[01] Họ và tên: <span class="field-value">${(data.fullName||"").toUpperCase()}</span></div>
<div class="field-row">[02] MST cho thuê BĐS: <span class="field-value">${data.taxCode||""}</span></div>
<div class="field-row">[03] Năm tính thuế: <span class="field-value">${data.taxYear||""}</span> — Kỳ: <span class="field-value">${periodMap[data.filingPeriod]||""}</span></div>

<div class="field-row" style="margin-top:14px;font-weight:bold">CHI TIẾT CÁC BẤT ĐỘNG SẢN CHO THUÊ</div>
<table class="form-table" style="width:100%;margin:8px 0;border-collapse:collapse;font-size:11pt">
<tr style="background:#f3f3f3;font-weight:bold">
<th style="border:1px solid #333;padding:5px;width:30px">STT</th>
<th style="border:1px solid #333;padding:5px">Địa chỉ BĐS</th>
<th style="border:1px solid #333;padding:5px">Loại</th>
<th style="border:1px solid #333;padding:5px">DT (m²)</th>
<th style="border:1px solid #333;padding:5px">Bên thuê</th>
<th style="border:1px solid #333;padding:5px">Số HĐ</th>
<th style="border:1px solid #333;padding:5px">Thời hạn</th>
<th style="border:1px solid #333;padding:5px">Giá thuê/tháng</th>
<th style="border:1px solid #333;padding:5px">DT/năm (đồng)</th>
</tr>
${rows.map(r => `<tr>
<td style="border:1px solid #333;padding:4px;text-align:center">${r.stt}</td>
<td style="border:1px solid #333;padding:4px">${r.address}</td>
<td style="border:1px solid #333;padding:4px">${r.type}</td>
<td style="border:1px solid #333;padding:4px;text-align:center">${r.area}</td>
<td style="border:1px solid #333;padding:4px">${r.tenant}<br><span style="font-size:9pt;color:#666">${r.tenantId}</span></td>
<td style="border:1px solid #333;padding:4px">${r.contractNo}</td>
<td style="border:1px solid #333;padding:4px;font-size:9pt">${r.from.d}/${r.from.m}/${r.from.y}<br>→ ${r.to.d}/${r.to.m}/${r.to.y}</td>
<td style="border:1px solid #333;padding:4px;text-align:right">${r.monthly}</td>
<td style="border:1px solid #333;padding:4px;text-align:right;font-weight:bold">${r.annual}</td>
</tr>`).join("")}
${rows.length === 0 ? `<tr><td colspan="9" style="border:1px solid #333;padding:8px;text-align:center;color:#999">Chưa có dữ liệu BĐS cho thuê</td></tr>` : ""}
<tr style="background:#f9f9f9;font-weight:bold">
<td colspan="8" style="border:1px solid #333;padding:5px;text-align:right">TỔNG DOANH THU/NĂM:</td>
<td style="border:1px solid #333;padding:5px;text-align:right;font-size:12pt">${vnd(data.totalAnnualRevenue)} đồng</td>
</tr>
</table>

<div class="field-row" style="margin-top:8px"><b>Ghi chú:</b> Ngưỡng doanh thu không chịu thuế: <b>1.000.000.000 đồng/năm</b> (NĐ 144/2026/NĐ-CP). Tính cho tổng tất cả BĐS cho thuê của 1 cá nhân theo năm dương lịch.</div>

<div class="field-row" style="margin-top:16px;text-align:center;font-style:italic">Tôi cam đoan số liệu khai trên là đúng sự thật./.</div>

<div class="signature-area" style="display:flex;justify-content:flex-end;margin-top:24px">
<div style="text-align:center;width:45%"><div class="date-line">${data.signPlace||"……."}, ngày ${sd.d} tháng ${sd.m} năm ${sd.y}</div><div class="signer-title">NGƯỜI NỘP THUẾ</div><div class="signer-note">(Ký, ghi rõ họ tên)</div><div style="margin-top:60px;font-weight:bold">${data.fullName||""}</div></div>
</div>`;
}

// ================================================================
// UTILITIES
// ================================================================
function escapeHtml(str) { const d = document.createElement("div"); d.textContent = str; return d.innerHTML; }

// ================================================================
// CHATBOT: Knowledge Base
// ================================================================
const CHAT_KB = [
    { keywords: ["mua", "bán", "chuyển nhượng", "mua nhà", "bán đất", "mua đất", "bán nhà"], type: "procedure", procId: "mua_ban_bds", answer: "Thủ tục <b>Mua bán / Chuyển nhượng BĐS</b> bao gồm:\n• Thuế TNCN: 2% giá trị BĐS\n• Lệ phí trước bạ: 0.5%\n• Phí công chứng: theo biểu lũy tiến\n• Phí đăng ký biến động: ~50.000đ\n• Thời gian: 15–30 ngày làm việc" },
    { keywords: ["tặng", "cho", "tặng cho", "cho tặng", "biếu"], type: "procedure", procId: "tang_cho_bds", answer: "Thủ tục <b>Tặng cho BĐS</b>:\n• Thuế TNCN: 2% (miễn nếu tặng cho vợ/chồng, cha mẹ, con cái, anh chị em ruột, ông bà—cháu)\n• Lệ phí trước bạ: 0.5%\n• Phí công chứng: theo biểu lũy tiến\n• Thời gian: 15–30 ngày" },
    { keywords: ["thừa kế", "di chúc", "chết", "mất", "khai tử", "chia thừa kế"], type: "procedure", procId: "thua_ke_bds", answer: "Thủ tục <b>Thừa kế BĐS</b>:\n• Thuế TNCN: 10% phần vượt 10 triệu (miễn nếu quan hệ trực hệ)\n• Lệ phí trước bạ: 0.5%\n• Cần: văn bản phân chia thừa kế công chứng hoặc di chúc\n• Thời gian: 15–30 ngày" },
    { keywords: ["thế chấp", "vay", "ngân hàng", "đăng ký thế chấp", "cầm cố"], type: "procedure", procId: "the_chap_bds", answer: "Thủ tục <b>Đăng ký thế chấp BĐS</b>:\n• Phí đăng ký thế chấp: ~80.000đ/lần\n• Cần: Hợp đồng thế chấp có công chứng, GCN bản gốc\n• Thời gian: 3–7 ngày làm việc" },
    { keywords: ["xóa thế chấp", "giải chấp", "trả hết nợ", "xóa đăng ký"], type: "procedure", procId: "xoa_the_chap", answer: "Thủ tục <b>Xóa đăng ký thế chấp (giải chấp)</b>:\n• Phí: 20.000đ/lần\n• Cần: Hợp đồng thế chấp gốc, văn bản đồng ý giải chấp của NH, GCN gốc\n• Thời gian: 3–7 ngày" },
    { keywords: ["tách thửa", "chia đất", "hợp thửa", "tách lô", "chia lô"], type: "procedure", procId: "tach_thua_dat", answer: "Thủ tục <b>Tách thửa / Hợp thửa đất</b>:\n• Phí đo đạc: 1–5 triệu (tùy địa phương)\n• Lệ phí cấp GCN mới: 50.000–100.000đ\n• Cần: GCN gốc, đơn đề nghị, đo đạc\n• Lưu ý: diện tích tối thiểu theo QĐ địa phương\n• Thời gian: 15–30 ngày" },
    { keywords: ["cấp sổ", "sổ đỏ", "sổ hồng", "cấp giấy chứng nhận", "lần đầu", "chưa có sổ", "đăng ký đất", "làm sổ"], type: "procedure", procId: "cap_gcn_lan_dau", answer: "Thủ tục <b>Cấp GCN QSDĐ lần đầu</b>:\n• Lệ phí trước bạ: 0.5% giá đất theo bảng giá UBND\n• Lệ phí cấp GCN: 50.000–100.000đ\n• Có thể ghi nợ tiền SDĐ\n• Thời gian: 30–60 ngày" },
    { keywords: ["chuyển mục đích", "chuyển đổi đất", "đất nông nghiệp", "chuyển đất ở", "chuyển mđsdđ"], type: "procedure", procId: "chuyen_muc_dich_sdd", answer: "Thủ tục <b>Chuyển MĐSDĐ</b>:\n• Tiền SDĐ = Giá đất mới − Giá đất cũ\n• Lệ phí trước bạ: 0.5% chênh lệch\n• Phải phù hợp quy hoạch\n• Thời gian: 20–45 ngày" },
    { keywords: ["cho thuê", "cho thue", "thuê nhà", "thuê đất", "thuê bđs", "khai thuế cho thuê", "thuế cho thuê", "cho thuê bất động sản"], type: "procedure", procId: "cho_thue_bds", answer: "Thủ tục <b>Khai thuế cho thuê BĐS</b> (NĐ 144/2026):\n• Doanh thu ≤ 1 tỷ/năm: KHÔNG phải nộp thuế GTGT, TNCN\n• Doanh thu > 1 tỷ/năm: GTGT 5% + TNCN 5% = 10%\n• Ngưỡng 1 tỷ tính tổng tất cả BĐS của 1 cá nhân/năm dương lịch\n• Kê khai bằng Mẫu 01/BĐS + Phụ lục 01/BK-BĐS\n• Kỳ kê khai: năm 1 lần (31/01) hoặc 6 tháng/lần" },
    { keywords: ["đăng ký mst", "mã số thuế cho thuê", "mst cho thuê", "đăng ký thuế cho thuê"], type: "faq", answer: "<b>Đăng ký MST cho thuê BĐS:</b>\n• Đăng ký 1 lần tại Chi cục Thuế quận/huyện nơi có BĐS\n• Dùng cho tất cả BĐS cho thuê (không cần đăng ký lại khi có thêm BĐS)\n• Khi có BĐS mới cho thuê → thông báo bổ sung địa điểm kinh doanh\n• <b>Không cần</b> thành lập hộ kinh doanh\n• Nếu DN khai thay → cá nhân không cần đăng ký MST riêng" },
    { keywords: ["ngưỡng 1 tỷ", "1 tỷ", "doanh thu cho thuê", "bao nhiêu phải nộp thuế", "dưới 1 tỷ", "trên 1 tỷ", "500 triệu"], type: "faq", answer: "<b>Ngưỡng doanh thu cho thuê BĐS (NĐ 144/2026/NĐ-CP):</b>\n• ≤ 1 tỷ đồng/năm → KHÔNG phải nộp thuế GTGT và TNCN\n• > 1 tỷ đồng/năm → phải nộp GTGT 5% + TNCN 5%\n• <b>Lưu ý:</b> Tính cho TỔNG tất cả BĐS của 1 cá nhân, theo năm dương lịch (T1–T12)\n• VD: BĐS 1 cho thuê 600tr + BĐS 2 cho thuê 700tr = 1.3 tỷ → vượt ngưỡng, phải nộp thuế" },
    { keywords: ["dn khai thay", "doanh nghiệp khai thay", "kê khai thay", "01/tckt", "mẫu 01 tckt"], type: "faq", answer: "<b>DN kê khai thuế thay cho cá nhân cho thuê BĐS:</b>\n• Chỉ áp dụng khi bên thuê là DN VÀ hợp đồng có thỏa thuận DN khai thay\n• DN dùng Mẫu 01/TCKT, sử dụng số CCCD/MST của cá nhân\n• Cá nhân KHÔNG cần đăng ký MST cho thuê riêng\n• Kỳ khai: theo tháng (nếu nhiều kỳ thanh toán) hoặc theo kỳ thanh toán (chậm nhất 10 ngày)\n• ⚠ Bên thuê là cá nhân → KHÔNG được thỏa thuận khai thay" },
    { keywords: ["kỳ kê khai cho thuê", "hạn nộp tờ khai", "31/01", "31/07", "kỳ khai thuế cho thuê"], type: "faq", answer: "<b>Kỳ kê khai thuế cho thuê BĐS:</b>\n• <b>Năm 1 lần:</b> hạn ngày 31/01 năm sau\n• <b>Năm 2 lần (6 tháng):</b> hạn 31/07 hàng năm và 31/01 năm sau\n• Dù doanh thu ≤ 1 tỷ (không phát sinh thuế) vẫn PHẢI kê khai\n• Doanh thu tính theo năm dương lịch, không theo năm hợp đồng" },
    { keywords: ["nhiều bđs", "nhiều bất động sản", "2 bất động sản", "hai nhà cho thuê", "nhiều nhà"], type: "faq", answer: "<b>Cho thuê nhiều BĐS:</b>\n• Đăng ký MST 1 lần — dùng chung cho tất cả BĐS\n• Khi có thêm BĐS → thông báo bổ sung địa điểm kinh doanh\n• Kê khai bằng Mẫu 01/BĐS + Phụ lục 01/BK-BĐS (liệt kê chi tiết từng BĐS)\n• Ngưỡng 1 tỷ/năm tính TỔNG doanh thu tất cả BĐS của 1 cá nhân" },
    { keywords: ["hkd", "hộ kinh doanh", "thành lập hộ", "đăng ký hộ kinh doanh"], type: "faq", answer: "<b>Có phải lập HKD khi cho thuê BĐS?</b>\n• <b>KHÔNG</b> — cá nhân cho thuê BĐS không phải thành lập hộ kinh doanh\n• Chỉ cần đăng ký MST cho thuê BĐS tại Chi cục Thuế và kê khai theo quy định\n• Nếu đã có MST HKD → vẫn phải đăng ký MST cho thuê BĐS riêng (khai theo Mẫu 01/BĐS)" },
    { keywords: ["thuế", "tncn", "thuế thu nhập", "thuế chuyển nhượng", "2%", "thuế bán nhà"], type: "faq", answer: "<b>Thuế TNCN khi chuyển nhượng BĐS:</b>\n• Thuế = 2% × giá chuyển nhượng (hoặc giá UBND, lấy cái cao hơn)\n• <b>Miễn thuế</b> khi tặng cho: vợ/chồng, cha mẹ đẻ—con đẻ, cha mẹ nuôi—con nuôi, cha mẹ chồng/vợ—con dâu/rể, ông bà—cháu, anh chị em ruột\n• Luật thuế TNCN 2025 (hiệu lực 01/7/2026) sẽ mở rộng diện miễn thuế" },
    { keywords: ["lệ phí trước bạ", "trước bạ", "0.5%", "lptb"], type: "faq", answer: "<b>Lệ phí trước bạ BĐS:</b>\n• Tỷ lệ: 0.5% × giá tính lệ phí\n• <b>Miễn 100%</b>: vợ/chồng, cha mẹ đẻ—con đẻ\n• <b>Miễn theo NĐ 175/2025</b>: mở rộng sang con nuôi, anh chị em ruột, ông bà—cháu (có hiệu lực)" },
    { keywords: ["công chứng", "phí công chứng", "văn phòng công chứng", "công chứng bao nhiêu"], type: "faq", answer: "<b>Phí công chứng hợp đồng BĐS:</b>\n• Dưới 50 triệu: 50.000đ\n• 50tr–100tr: 100.000đ\n• 100tr–1 tỷ: 0.1% giá trị\n• 1 tỷ–3 tỷ: 0.06%\n• 3 tỷ–5 tỷ: 0.05%\n• 5 tỷ–10 tỷ: 0.04%\n• Trên 10 tỷ: 0.03% (tối đa 70 triệu)" },
    { keywords: ["giấy tờ", "hồ sơ", "cần gì", "chuẩn bị gì", "tài liệu", "giấy tờ cần"], type: "faq", answer: "<b>Giấy tờ phổ biến cho giao dịch BĐS:</b>\n• GCN QSDĐ (sổ đỏ/sổ hồng) bản gốc\n• CMND/CCCD hai bên\n• Hợp đồng mua bán/tặng cho/thừa kế (công chứng)\n• Đơn đăng ký biến động (Mẫu số 18 — NĐ 151/2025)\n• Tờ khai thuế TNCN (Mẫu 03/BĐS-TNCN)\n• Tờ khai lệ phí trước bạ (Mẫu 01/LPTB)\n• Đăng ký kết hôn hoặc xác nhận độc thân\n\nChọn thủ tục cụ thể để xem đầy đủ ↓" },
    { keywords: ["bao lâu", "thời gian", "mấy ngày", "bao nhiêu ngày"], type: "faq", answer: "<b>Thời gian xử lý thủ tục BĐS:</b>\n• Mua bán / Tặng cho / Thừa kế: 15–30 ngày\n• Đăng ký / Xóa thế chấp: 3–7 ngày\n• Tách thửa: 15–30 ngày\n• Cấp GCN lần đầu: 30–60 ngày\n• Chuyển MĐSDĐ: 20–45 ngày\n\n⚠ Thực tế có thể lâu hơn tùy địa phương" },
    { keywords: ["phí", "chi phí", "tốn bao nhiêu", "hết bao nhiêu", "tính tiền", "bao nhiêu tiền"], type: "calculator", answer: "Bạn có thể dùng <b>Máy tính chi phí</b> để ước tính thuế, phí khi giao dịch BĐS.\nNhập giá trị BĐS → biết ngay thuế TNCN, lệ phí trước bạ, phí công chứng." },
    { keywords: ["miễn thuế", "miễn phí", "không phải đóng thuế", "được miễn"], type: "faq", answer: "<b>Các trường hợp miễn thuế/phí khi giao dịch BĐS:</b>\n\n<u>Miễn thuế TNCN</u> (tặng cho/thừa kế):\n• Vợ — chồng\n• Cha mẹ đẻ — con đẻ\n• Cha mẹ nuôi — con nuôi\n• Ông bà — cháu\n• Anh chị em ruột\n• Cha mẹ chồng/vợ — con dâu/rể\n\n<u>Miễn lệ phí trước bạ</u>:\n• Vợ — chồng, Cha mẹ đẻ — con đẻ: miễn 100%\n• NĐ 175/2025 mở rộng thêm" },
    { keywords: ["điền", "điền mẫu", "điền form", "tạo biểu mẫu", "tạo đơn", "viết đơn"], type: "form_general", answer: "Tôi có thể giúp bạn điền các biểu mẫu sau:\n• <b>Mẫu số 18</b> — Đơn đăng ký biến động (NĐ 151/2025)\n• <b>Mẫu 03/BĐS-TNCN</b> — Tờ khai thuế TNCN\n• <b>Mẫu 01/LPTB</b> — Tờ khai lệ phí trước bạ\n• <b>Hợp đồng đặt cọc</b>\n• <b>Giấy ủy quyền</b>\n• <b>Mẫu 01a</b> — Đăng ký thế chấp BĐS (NĐ 99/2022)\n• <b>Mẫu 03a</b> — Xóa đăng ký thế chấp\n• <b>Mẫu số 21</b> — Tách thửa/hợp thửa (NĐ 151/2025)\n• <b>Mẫu số 04</b> — Đăng ký đất đai lần đầu (NĐ 151/2025)\n• <b>Mẫu số 23</b> — Điều chỉnh QĐ chuyển MĐSDĐ (NĐ 151/2025)\n• <b>Mẫu 01/BĐS</b> — Tờ khai thuế cho thuê BĐS\n• <b>Mẫu 01/BK-BĐS</b> — Bảng kê BĐS cho thuê\n\nBạn muốn điền mẫu nào?" },
    { keywords: ["mẫu 18", "mau 18", "mẫu 11", "mau 11", "đơn biến động", "đăng ký biến động"], type: "form", formId: "mau18", answer: "Mở <b>Mẫu số 18 — Đơn đăng ký biến động đất đai</b> (NĐ 151/2025, thay thế Mẫu 11/ĐK cũ) để điền." },
    { keywords: ["mẫu 03 bds", "mau 03 bds", "thuế tncn", "tờ khai thuế", "03/bds", "03bds"], type: "form", formId: "mau03bds_tncn", answer: "Mở <b>Mẫu 03/BĐS-TNCN — Tờ khai thuế TNCN</b> để điền." },
    { keywords: ["mẫu 01 lptb", "mau 01 lptb", "lệ phí trước bạ", "tờ khai trước bạ", "01/lptb"], type: "form", formId: "mau01lptb", answer: "Mở <b>Mẫu 01/LPTB — Tờ khai lệ phí trước bạ</b> để điền." },
    { keywords: ["đặt cọc", "hợp đồng cọc", "tiền cọc"], type: "form", formId: "hop_dong_dat_coc", answer: "Mở <b>Hợp đồng đặt cọc mua bán BĐS</b> để điền." },
    { keywords: ["ủy quyền", "uy quyen", "giấy ủy quyền"], type: "form", formId: "giay_uy_quyen", answer: "Mở <b>Giấy ủy quyền giao dịch BĐS</b> để điền." },
    { keywords: ["mẫu 01a", "mau 01a", "đăng ký thế chấp mẫu", "phiếu đăng ký bảo đảm", "đăng ký biện pháp bảo đảm"], type: "form", formId: "mau01a_dk_bao_dam", answer: "Mở <b>Mẫu 01a — Phiếu yêu cầu đăng ký biện pháp bảo đảm</b> (NĐ 99/2022) để điền." },
    { keywords: ["mẫu 03a", "mau 03a", "xóa đăng ký", "xóa thế chấp mẫu", "phiếu xóa"], type: "form", formId: "mau03a_xoa_dk", answer: "Mở <b>Mẫu 03a — Phiếu yêu cầu xóa đăng ký biện pháp bảo đảm</b> để điền." },
    { keywords: ["mẫu 21", "mau 21", "mẫu 01 đk", "mau 01 dk", "đơn tách thửa", "đơn hợp thửa"], type: "form", formId: "mau21", answer: "Mở <b>Mẫu số 21 — Đơn đề nghị tách thửa/hợp thửa</b> (NĐ 151/2025, thay thế Mẫu 01/ĐK cũ) để điền." },
    { keywords: ["mẫu 04", "mau 04", "đăng ký đất đai", "đơn đăng ký đất", "04/đk"], type: "form", formId: "mau04_nd151", answer: "Mở <b>Mẫu số 04 — Đơn đăng ký đất đai lần đầu</b> (NĐ 151/2025) để điền." },
    { keywords: ["mẫu 23", "mau 23", "mẫu 03 điều chỉnh", "điều chỉnh quyết định", "điều chỉnh qđ"], type: "form", formId: "mau23", answer: "Mở <b>Mẫu số 23 — Đơn đề nghị điều chỉnh QĐ chuyển MĐSDĐ</b> (NĐ 151/2025, thay thế Mẫu 03 cũ) để điền." },
    { keywords: ["mẫu 01 bds", "mau 01 bds", "01/bds", "tờ khai cho thuê", "khai thuế cho thuê mẫu"], type: "form", formId: "mau01_bds", answer: "Mở <b>Mẫu 01/BĐS — Tờ khai thuế cho thuê BĐS</b> để điền." },
    { keywords: ["bảng kê bds", "01/bk-bds", "bảng kê cho thuê", "phụ lục bảng kê", "01 bk bds"], type: "form", formId: "mau01_bk_bds", answer: "Mở <b>Mẫu 01/BK-BĐS — Bảng kê chi tiết BĐS cho thuê</b> để điền." },
    { keywords: ["xin chào", "hello", "hi", "chào", "chào bạn"], type: "greeting", answer: "Xin chào! 👋 Tôi là <b>Trợ lý Pháp luật Nhà đất</b>.\nTôi có thể giúp bạn:\n• Hỏi đáp về thủ tục mua bán, tặng cho, thừa kế, cho thuê BĐS\n• Tính chi phí giao dịch & thuế cho thuê\n• Điền biểu mẫu tự động\n\nBạn cần hỏi gì?" },
    { keywords: ["cảm ơn", "thanks", "thank you", "cám ơn"], type: "greeting", answer: "Không có gì! Bạn cần hỏi thêm gì cứ nhắn nhé. 😊" },
];

const CHAT_QUICK_QUESTIONS = [
    "Mua nhà cần gì?",
    "Tính chi phí",
    "Cho thuê BĐS",
    "Tách thửa đất",
    "Điền mẫu 11",
    "Miễn thuế khi nào?",
];

// ================================================================
// CHATBOT: Engine
// ================================================================
function chatNormalize(text) {
    return text.toLowerCase()
        .normalize("NFD").replace(/[̀-ͯ]/g, "")
        .replace(/đ/g, "d").replace(/Đ/g, "D")
        .replace(/[^a-z0-9\s]/g, " ")
        .replace(/\s+/g, " ").trim();
}

function chatMatch(input) {
    const norm = chatNormalize(input);
    const words = norm.split(" ");
    let best = null;
    let bestScore = 0;

    for (const entry of CHAT_KB) {
        let score = 0;
        for (const kw of entry.keywords) {
            const kwNorm = chatNormalize(kw);
            if (norm.includes(kwNorm)) {
                score += kwNorm.split(" ").length * 2;
            } else {
                const kwWords = kwNorm.split(" ");
                for (const kw2 of kwWords) {
                    if (words.some(w => w === kw2)) score += 1;
                    else if (words.some(w => w.includes(kw2) || kw2.includes(w))) score += 0.5;
                }
            }
        }
        if (score > bestScore) { bestScore = score; best = entry; }
    }
    return bestScore >= 1.5 ? best : null;
}

function chatGetActions(entry) {
    const actions = [];
    if (entry.type === "procedure" && entry.procId) {
        actions.push({ label: "📋 Xem thủ tục", action: "procedure", procId: entry.procId });
        actions.push({ label: "💰 Tính chi phí", action: "calculator" });
        const proc = PROCEDURES[entry.procId];
        if (proc && proc.baseForms.length) {
            actions.push({ label: "📝 Điền biểu mẫu", action: "procedure", procId: entry.procId });
        }
    } else if (entry.type === "form" && entry.formId) {
        actions.push({ label: "📝 Điền ngay", action: "form", formId: entry.formId });
    } else if (entry.type === "form_general") {
        actions.push({ label: "📝 Mẫu số 18", action: "form", formId: "mau18" });
        actions.push({ label: "💰 Mẫu 03/BĐS", action: "form", formId: "mau03bds_tncn" });
        actions.push({ label: "📋 Mẫu 01/LPTB", action: "form", formId: "mau01lptb" });
    } else if (entry.type === "calculator") {
        actions.push({ label: "💰 Mở máy tính chi phí", action: "calculator" });
    }
    return actions;
}

function chatExecuteAction(action, procId, formId) {
    const panel = $("#chatbot-panel");
    if (panel) panel.classList.add("hidden");
    toggleChatIcons(false);

    if (action === "procedure" && procId) {
        showProcedure(procId);
    } else if (action === "form" && formId) {
        const parentProc = Object.values(PROCEDURES).find(p => p.baseForms.includes(formId));
        if (parentProc) currentProcId = parentProc.id;
        showQuestionnaireView(formId, true);
    } else if (action === "calculator") {
        hideAll();
        viewCalculator.classList.remove("hidden");
    }
}

// ================================================================
// CHATBOT: UI Rendering
// ================================================================
let chatMessages = [];

function chatAddMessage(role, html, actions) {
    chatMessages.push({ role, html, actions });
    chatRenderMessages();
}

function chatRenderMessages() {
    const el = $("#chat-messages");
    if (!el) return;
    el.innerHTML = chatMessages.map((msg, i) => {
        const isBot = msg.role === "bot";
        const avatar = isBot ? "⚖️" : "👤";
        let actionsHtml = "";
        if (msg.actions && msg.actions.length) {
            actionsHtml = `<div class="chat-msg__actions">${msg.actions.map((a, j) =>
                `<button class="chat-msg__action-btn" data-idx="${i}" data-aidx="${j}">${a.label}</button>`
            ).join("")}</div>`;
        }
        return `<div class="chat-msg chat-msg--${msg.role}">
            <div class="chat-msg__avatar">${avatar}</div>
            <div><div class="chat-msg__bubble">${msg.html}</div>${actionsHtml}</div>
        </div>`;
    }).join("");

    el.querySelectorAll(".chat-msg__action-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const msg = chatMessages[Number(btn.dataset.idx)];
            const act = msg.actions[Number(btn.dataset.aidx)];
            chatExecuteAction(act.action, act.procId, act.formId);
        });
    });

    el.scrollTop = el.scrollHeight;
}

function chatRenderQuickReplies() {
    const el = $("#chat-quick-replies");
    if (!el) return;
    el.innerHTML = CHAT_QUICK_QUESTIONS.map(q =>
        `<button class="chat-quick-btn">${q}</button>`
    ).join("");
    el.querySelectorAll(".chat-quick-btn").forEach(btn => {
        btn.addEventListener("click", () => chatHandleInput(btn.textContent));
    });
}

function chatShowTyping() {
    const el = $("#chat-messages");
    if (!el) return;
    const typing = document.createElement("div");
    typing.className = "chat-msg chat-msg--bot";
    typing.id = "chat-typing";
    typing.innerHTML = `<div class="chat-msg__avatar">⚖️</div><div class="chat-msg__bubble"><div class="chat-typing"><span></span><span></span><span></span></div></div>`;
    el.appendChild(typing);
    el.scrollTop = el.scrollHeight;
}

function chatRemoveTyping() {
    const t = $("#chat-typing");
    if (t) t.remove();
}

function chatHandleInput(text) {
    if (!text.trim()) return;
    const input = $("#chat-input");
    if (input) input.value = "";

    chatAddMessage("user", escapeHtml(text));

    chatShowTyping();
    setTimeout(() => {
        chatRemoveTyping();
        const match = chatMatch(text);
        if (match) {
            const actions = chatGetActions(match);
            chatAddMessage("bot", match.answer.replace(/\n/g, "<br>"), actions);
        } else {
            chatAddMessage("bot", "Xin lỗi, tôi chưa hiểu câu hỏi của bạn. 🤔<br><br>Bạn có thể hỏi về:<br>• Thủ tục mua bán, tặng cho, thừa kế BĐS<br>• Thuế, phí, chi phí giao dịch<br>• Tách thửa, cấp sổ đỏ, chuyển MĐSDĐ<br>• Điền biểu mẫu cụ thể<br><br>Hoặc chọn câu hỏi gợi ý bên dưới ↓");
        }
    }, 400 + Math.random() * 300);
}

// ================================================================
// CHATBOT: Voice Input (Web Speech API)
// ================================================================
let speechRecognition = null;
let isRecording = false;

function initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return null;

    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.continuous = false;

    recognition.addEventListener("result", (e) => {
        const transcript = e.results[0][0].transcript;
        const input = $("#chat-input");
        if (input) input.value = transcript;
        chatHandleInput(transcript);
    });

    recognition.addEventListener("end", () => {
        isRecording = false;
        const btn = $("#btn-voice");
        if (btn) btn.classList.remove("recording");
    });

    recognition.addEventListener("error", (e) => {
        isRecording = false;
        const btn = $("#btn-voice");
        if (btn) btn.classList.remove("recording");
        if (e.error === "not-allowed") {
            chatAddMessage("bot", "⚠️ Trình duyệt chưa cấp quyền micro. Vui lòng cho phép sử dụng microphone trong cài đặt trình duyệt.");
        } else if (e.error !== "aborted") {
            chatAddMessage("bot", "⚠️ Không nhận diện được giọng nói. Vui lòng thử lại hoặc nhập bằng bàn phím.");
        }
    });

    return recognition;
}

function toggleVoice() {
    if (!speechRecognition) {
        speechRecognition = initSpeechRecognition();
    }
    if (!speechRecognition) {
        chatAddMessage("bot", "⚠️ Trình duyệt của bạn không hỗ trợ nhận diện giọng nói. Vui lòng sử dụng Chrome hoặc Edge.");
        return;
    }

    const btn = $("#btn-voice");
    if (isRecording) {
        speechRecognition.stop();
        isRecording = false;
        if (btn) btn.classList.remove("recording");
    } else {
        speechRecognition.start();
        isRecording = true;
        if (btn) btn.classList.add("recording");
        chatAddMessage("bot", "🎤 Đang nghe... Hãy nói câu hỏi của bạn.");
    }
}

// ================================================================
// CHATBOT: Init & Events
// ================================================================
function toggleChatIcons(isOpen) {
    const openIcon = $("#chat-icon-open");
    const closeIcon = $("#chat-icon-close");
    const badge = $("#chat-badge");
    if (openIcon) openIcon.classList.toggle("hidden", isOpen);
    if (closeIcon) closeIcon.classList.toggle("hidden", !isOpen);
    if (badge && isOpen) badge.classList.add("hidden");
}

function initChatbot() {
    const toggleBtn = $("#btn-toggle-chat");
    const panel = $("#chatbot-panel");
    const sendBtn = $("#btn-send-chat");
    const input = $("#chat-input");
    const voiceBtn = $("#btn-voice");
    const clearBtn = $("#btn-clear-chat");

    if (!toggleBtn || !panel) return;

    toggleBtn.addEventListener("click", () => {
        const isHidden = panel.classList.toggle("hidden");
        toggleChatIcons(!isHidden);
        if (!isHidden && chatMessages.length === 0) {
            chatAddMessage("bot", "Xin chào! 👋 Tôi là <b>Trợ lý Pháp luật Nhà đất</b>.<br><br>Tôi có thể giúp bạn:<br>• 📖 Hỏi đáp về thủ tục BĐS<br>• 💰 Tính chi phí giao dịch<br>• 📝 Điền biểu mẫu tự động<br>• 🎤 Hỗ trợ nhập bằng giọng nói<br><br>Hãy đặt câu hỏi hoặc chọn gợi ý bên dưới!");
            chatRenderQuickReplies();
        }
        if (!isHidden && input) input.focus();
    });

    if (sendBtn) {
        sendBtn.addEventListener("click", () => {
            if (input) chatHandleInput(input.value);
        });
    }

    if (input) {
        input.addEventListener("keydown", (e) => {
            if (e.key === "Enter") { e.preventDefault(); chatHandleInput(input.value); }
        });
    }

    if (voiceBtn) {
        voiceBtn.addEventListener("click", toggleVoice);
    }

    if (clearBtn) {
        clearBtn.addEventListener("click", () => {
            chatMessages = [];
            chatRenderMessages();
            chatAddMessage("bot", "Hội thoại đã được xóa. Bạn cần hỏi gì mới? 😊");
            chatRenderQuickReplies();
        });
    }
}

// ================================================================
// START
// ================================================================
init();
initChatbot();
