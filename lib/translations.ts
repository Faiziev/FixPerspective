export type Translation = {
  // App title and descriptions
  appTitle: string;
  appDescription: string;
  
  // Upload section
  uploadTitle: string;
  uploadDescription: string;
  selectImage: string;
  changeImage: string;
  editImage: string;
  
  // Tabs
  editTab: string;
  exportTab: string;
  
  // Edit controls
  resetPoints: string;
  cropImage: string;
  cropped: string;
  applyPerspective: string;
  perspectiveCorrected: string;
  controlPoints: string;
  
  // Export controls
  quality: string;
  format: string;
  formatPng: string;
  formatJpg: string;
  exportImage: string;
  exportDescription: string;
  perspectiveExportDesc: string;
  croppedExportDesc: string;
  requireCropDesc: string;
  
  // SEO
  metaTitle: string;
  metaDescription: string;
};

export const translations: Record<string, Translation> = {
  en: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "Upload an image and use the Bezier control points to correct distortion. Drag the corner points and their handles to create the perfect warp.",
    
    // Upload section
    uploadTitle: "Upload an image",
    uploadDescription: "PNG, JPG, WEBP up to 10MB",
    selectImage: "Select Image",
    changeImage: "Change Image",
    editImage: "Edit Image",
    
    // Tabs
    editTab: "Edit",
    exportTab: "Export",
    
    // Edit controls
    resetPoints: "Reset Points",
    cropImage: "Crop Image",
    cropped: "Cropped",
    applyPerspective: "Apply Perspective Correction",
    perspectiveCorrected: "Perspective Corrected",
    controlPoints: "Control Points",
    
    // Export controls
    quality: "Quality",
    format: "Format",
    formatPng: "Using PNG format for maximum quality",
    formatJpg: "Using JPEG format for smaller file size",
    exportImage: "Export High-Resolution Image",
    exportDescription: "Export options for your image",
    perspectiveExportDesc: "The image will be exported with perspective correction applied at full resolution.",
    croppedExportDesc: "The image will be exported with the current crop at full resolution.",
    requireCropDesc: "Please crop the image before exporting.",
    
    // SEO
    metaTitle: "FixPerspective | Free Online Perspective Correction Tool by Faiziev",
    metaDescription: "Free online tool to fix perspective distortion in photos. Easily correct skewed images, fix perspective issues, and straighten your photos in seconds - no download required."
  },
  
  es: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "Sube una imagen y usa los puntos de control Bezier para corregir la distorsión. Arrastra los puntos de las esquinas y sus manejadores para crear la deformación perfecta.",
    
    // Upload section
    uploadTitle: "Subir una imagen",
    uploadDescription: "PNG, JPG, WEBP hasta 10MB",
    selectImage: "Seleccionar Imagen",
    changeImage: "Cambiar Imagen",
    editImage: "Editar Imagen",
    
    // Tabs
    editTab: "Editar",
    exportTab: "Exportar",
    
    // Edit controls
    resetPoints: "Restablecer Puntos",
    cropImage: "Recortar Imagen",
    cropped: "Recortada",
    applyPerspective: "Aplicar Corrección de Perspectiva",
    perspectiveCorrected: "Perspectiva Corregida",
    controlPoints: "Puntos de Control",
    
    // Export controls
    quality: "Calidad",
    format: "Formato",
    formatPng: "Usando formato PNG para máxima calidad",
    formatJpg: "Usando formato JPEG para archivos más pequeños",
    exportImage: "Exportar Imagen en Alta Resolución",
    exportDescription: "Opciones de exportación para tu imagen",
    perspectiveExportDesc: "La imagen se exportará con corrección de perspectiva aplicada a máxima resolución.",
    croppedExportDesc: "La imagen se exportará con el recorte actual a máxima resolución.",
    requireCropDesc: "Por favor recorta la imagen antes de exportar.",
    
    // SEO
    metaTitle: "FixPerspective | Herramienta de Corrección de Perspectiva Online Gratuita por Faiziev",
    metaDescription: "Herramienta online gratuita para corregir la distorsión de perspectiva en fotos. Corrige fácilmente imágenes inclinadas, arregla problemas de perspectiva y endereza tus fotos en segundos - sin descargas."
  },
  
  fr: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "Téléchargez une image et utilisez les points de contrôle Bezier pour corriger la distorsion. Faites glisser les points d'angle et leurs poignées pour créer la déformation parfaite.",
    
    // Upload section
    uploadTitle: "Télécharger une image",
    uploadDescription: "PNG, JPG, WEBP jusqu'à 10MB",
    selectImage: "Sélectionner l'Image",
    changeImage: "Changer l'Image",
    editImage: "Modifier l'Image",
    
    // Tabs
    editTab: "Éditer",
    exportTab: "Exporter",
    
    // Edit controls
    resetPoints: "Réinitialiser les Points",
    cropImage: "Recadrer l'Image",
    cropped: "Recadrée",
    applyPerspective: "Appliquer la Correction de Perspective",
    perspectiveCorrected: "Perspective Corrigée",
    controlPoints: "Points de Contrôle",
    
    // Export controls
    quality: "Qualité",
    format: "Format",
    formatPng: "Utilisation du format PNG pour une qualité maximale",
    formatJpg: "Utilisation du format JPEG pour des fichiers plus petits",
    exportImage: "Exporter l'Image en Haute Résolution",
    exportDescription: "Options d'exportation pour votre image",
    perspectiveExportDesc: "L'image sera exportée avec la correction de perspective appliquée en pleine résolution.",
    croppedExportDesc: "L'image sera exportée avec le recadrage actuel en pleine résolution.",
    requireCropDesc: "Veuillez recadrer l'image avant d'exporter.",
    
    // SEO
    metaTitle: "FixPerspective | Outil de Correction de Perspective en Ligne Gratuit par Faiziev",
    metaDescription: "Outil en ligne gratuit pour corriger la distorsion de perspective dans les photos. Corrigez facilement les images inclinées, résolvez les problèmes de perspective et redressez vos photos en quelques secondes - sans téléchargement nécessaire."
  },
  
  de: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "Laden Sie ein Bild hoch und verwenden Sie die Bezier-Kontrollpunkte, um Verzerrungen zu korrigieren. Ziehen Sie die Eckpunkte und ihre Griffe, um die perfekte Verformung zu erzeugen.",
    
    // Upload section
    uploadTitle: "Bild hochladen",
    uploadDescription: "PNG, JPG, WEBP bis zu 10MB",
    selectImage: "Bild auswählen",
    changeImage: "Bild ändern",
    editImage: "Bild bearbeiten",
    
    // Tabs
    editTab: "Bearbeiten",
    exportTab: "Exportieren",
    
    // Edit controls
    resetPoints: "Punkte zurücksetzen",
    cropImage: "Bild zuschneiden",
    cropped: "Zugeschnitten",
    applyPerspective: "Perspektivkorrektur anwenden",
    perspectiveCorrected: "Perspektive korrigiert",
    controlPoints: "Kontrollpunkte",
    
    // Export controls
    quality: "Qualität",
    format: "Format",
    formatPng: "PNG-Format für maximale Qualität",
    formatJpg: "JPEG-Format für kleinere Dateigröße",
    exportImage: "Hochauflösendes Bild exportieren",
    exportDescription: "Exportoptionen für Ihr Bild",
    perspectiveExportDesc: "Das Bild wird mit angewandter Perspektivkorrektur in voller Auflösung exportiert.",
    croppedExportDesc: "Das Bild wird mit dem aktuellen Zuschnitt in voller Auflösung exportiert.",
    requireCropDesc: "Bitte schneiden Sie das Bild vor dem Export zu.",
    
    // SEO
    metaTitle: "FixPerspective | Online Perspektivkorrektur-Tool Kostenlos von Faiziev",
    metaDescription: "Kostenloses Online-Tool zur Korrektur von Perspektivverzerrungen in Fotos. Korrigieren Sie schräge Bilder, beheben Sie Perspektivprobleme und richten Sie Ihre Fotos in Sekunden aus - ohne Download erforderlich."
  },
  
  tr: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "Bir görüntü yükleyin ve bozulmaları düzeltmek için Bezier kontrol noktalarını kullanın. Mükemmel eğriliği oluşturmak için köşe noktalarını ve tutamaçlarını sürükleyin.",
    
    // Upload section
    uploadTitle: "Bir görüntü yükleyin",
    uploadDescription: "10MB'a kadar PNG, JPG, WEBP",
    selectImage: "Görüntü Seç",
    changeImage: "Görüntüyü Değiştir",
    editImage: "Görüntüyü Düzenle",
    
    // Tabs
    editTab: "Düzenle",
    exportTab: "Dışa Aktar",
    
    // Edit controls
    resetPoints: "Noktaları Sıfırla",
    cropImage: "Görüntüyü Kırp",
    cropped: "Kırpılmış",
    applyPerspective: "Perspektif Düzeltmesi Uygula",
    perspectiveCorrected: "Perspektif Düzeltildi",
    controlPoints: "Kontrol Noktaları",
    
    // Export controls
    quality: "Kalite",
    format: "Format",
    formatPng: "Maksimum kalite için PNG formatı kullanılıyor",
    formatJpg: "Daha küçük dosya boyutu için JPEG formatı kullanılıyor",
    exportImage: "Yüksek Çözünürlüklü Görüntüyü Dışa Aktar",
    exportDescription: "Görüntünüz için dışa aktarma seçenekleri",
    perspectiveExportDesc: "Görüntü, tam çözünürlükte perspektif düzeltmesi uygulanmış olarak dışa aktarılacaktır.",
    croppedExportDesc: "Görüntü, mevcut kırpma ile tam çözünürlükte dışa aktarılacaktır.",
    requireCropDesc: "Lütfen dışa aktarmadan önce görüntüyü kırpın.",
    
    // SEO
    metaTitle: "FixPerspective | Faiziev Tarafından Ücretsiz Çevrimiçi Perspektif Düzeltme Aracı",
    metaDescription: "Fotoğraflardaki perspektif bozulmalarını düzeltmek için ücretsiz çevrimiçi araç. Eğimli görüntüleri kolayca düzeltin, perspektif sorunlarını çözün ve fotoğraflarınızı saniyeler içinde düzleştirin - indirme gerekmez."
  },
  
  ru: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "Загрузите изображение и используйте контрольные точки Безье для исправления искажений. Перетаскивайте угловые точки и их маркеры для создания идеального искривления.",
    
    // Upload section
    uploadTitle: "Загрузить изображение",
    uploadDescription: "PNG, JPG, WEBP до 10МБ",
    selectImage: "Выбрать изображение",
    changeImage: "Изменить изображение",
    editImage: "Редактировать изображение",
    
    // Tabs
    editTab: "Редактировать",
    exportTab: "Экспорт",
    
    // Edit controls
    resetPoints: "Сбросить точки",
    cropImage: "Обрезать изображение",
    cropped: "Обрезано",
    applyPerspective: "Применить коррекцию перспективы",
    perspectiveCorrected: "Перспектива исправлена",
    controlPoints: "Контрольные точки",
    
    // Export controls
    quality: "Качество",
    format: "Формат",
    formatPng: "Используется формат PNG для максимального качества",
    formatJpg: "Используется формат JPEG для меньшего размера файла",
    exportImage: "Экспорт изображения высокого разрешения",
    exportDescription: "Параметры экспорта для вашего изображения",
    perspectiveExportDesc: "Изображение будет экспортировано с применением коррекции перспективы в полном разрешении.",
    croppedExportDesc: "Изображение будет экспортировано с текущей обрезкой в полном разрешении.",
    requireCropDesc: "Пожалуйста, обрежьте изображение перед экспортом.",
    
    // SEO
    metaTitle: "FixPerspective | Бесплатный онлайн-инструмент коррекции перспективы от Faiziev",
    metaDescription: "Бесплатный онлайн-инструмент для исправления искажений перспективы на фотографиях. Легко исправляйте перекошенные изображения, решайте проблемы с перспективой и выравнивайте фотографии за считанные секунды - без необходимости загрузки."
  },
  
  ja: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "画像をアップロードし、ベジェコントロールポイントを使用して歪みを修正します。角のポイントとハンドルをドラッグして、完璧なワープを作成しましょう。",
    
    // Upload section
    uploadTitle: "画像をアップロード",
    uploadDescription: "PNG、JPG、WEBP（最大10MB）",
    selectImage: "画像を選択",
    changeImage: "画像を変更",
    editImage: "画像を編集",
    
    // Tabs
    editTab: "編集",
    exportTab: "エクスポート",
    
    // Edit controls
    resetPoints: "ポイントをリセット",
    cropImage: "画像を切り抜く",
    cropped: "切り抜き済み",
    applyPerspective: "遠近補正を適用",
    perspectiveCorrected: "遠近補正済み",
    controlPoints: "コントロールポイント",
    
    // Export controls
    quality: "品質",
    format: "フォーマット",
    formatPng: "最高品質のためPNGフォーマットを使用",
    formatJpg: "ファイルサイズを小さくするためJPEGフォーマットを使用",
    exportImage: "高解像度画像をエクスポート",
    exportDescription: "画像のエクスポートオプション",
    perspectiveExportDesc: "画像は遠近補正を適用した状態で最大解像度でエクスポートされます。",
    croppedExportDesc: "画像は現在の切り抜きで最大解像度でエクスポートされます。",
    requireCropDesc: "エクスポートする前に画像を切り抜いてください。",
    
    // SEO
    metaTitle: "FixPerspective | Faizievによる無料オンライン遠近補正ツール",
    metaDescription: "写真の遠近歪みを修正するための無料オンラインツール。傾いた画像を簡単に修正し、遠近の問題を解決し、数秒で写真を真っ直ぐにできます - ダウンロード不要。"
  },
  
  zh: {
    // App title and descriptions
    appTitle: "FixPerspective",
    appDescription: "上传图像并使用贝塞尔控制点来校正失真。拖动角点及其手柄以创建完美的变形效果。",
    
    // Upload section
    uploadTitle: "上传图像",
    uploadDescription: "PNG、JPG、WEBP，最大10MB",
    selectImage: "选择图像",
    changeImage: "更换图像",
    editImage: "编辑图像",
    
    // Tabs
    editTab: "编辑",
    exportTab: "导出",
    
    // Edit controls
    resetPoints: "重置控制点",
    cropImage: "裁剪图像",
    cropped: "已裁剪",
    applyPerspective: "应用透视校正",
    perspectiveCorrected: "透视已校正",
    controlPoints: "控制点",
    
    // Export controls
    quality: "质量",
    format: "格式",
    formatPng: "使用PNG格式以获得最高质量",
    formatJpg: "使用JPEG格式以获得更小的文件大小",
    exportImage: "导出高分辨率图像",
    exportDescription: "图像导出选项",
    perspectiveExportDesc: "图像将以应用透视校正的全分辨率导出。",
    croppedExportDesc: "图像将以当前裁剪的全分辨率导出。",
    requireCropDesc: "请在导出前裁剪图像。",
    
    // SEO
    metaTitle: "FixPerspective | Faiziev提供的免费在线透视校正工具",
    metaDescription: "免费在线工具，用于修复照片中的透视失真。轻松校正倾斜的图像，解决透视问题，并在几秒钟内让照片变得笔直 - 无需下载。"
  }
};

// Fallback to English if the language is not supported
export function getTranslation(language: string): Translation {
  return translations[language] || translations.en;
}

// Get user's browser language or default to English
export function getDefaultLanguage(): string {
  if (typeof window === 'undefined') return 'en';
  
  const browserLang = navigator.language.split('-')[0];
  return translations[browserLang] ? browserLang : 'en';
} 