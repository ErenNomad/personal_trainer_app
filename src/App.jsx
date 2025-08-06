import React, { useState, useEffect } from 'react';
import { Dumbbell, Utensils, CheckCircle, Target, Flame, RefreshCw, ChevronDown, ChevronUp, Info, Ruler, TrendingUp, Calendar, Save, User, ArrowLeft, ArrowRight, XCircle, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// --- Egzersiz Resim Dizileri ---
const exerciseImages = {
    floorPress: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Floor_Press/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Floor_Press/1.jpg'],
    kneePushup: ['https://i.ytimg.com/vi/jWxvty2KROs/maxresdefault.jpg'],
    lateralRaise: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Side_Lateral_Raise/1.jpg'],
    tricepsExtension: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Triceps_Extension/1.jpg'],
    oneArmRow: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/One-Arm_Flat_Bench_Dumbbell_Flye/1.jpg'],
    farmersWalk: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Farmers_Walk/1.jpg'],
    bicepsCurl: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bicep_Curl/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Bicep_Curl/1.jpg'],
    gluteBridge: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Glute_Bridge/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Barbell_Glute_Bridge/1.jpg'],
    gobletSquat: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Goblet_Squat/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Goblet_Squat/1.jpg'],
    lunges: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lunges/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dumbbell_Lunges/1.jpg'],
    calfRaise: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Calf_Raise/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Standing_Dumbbell_Calf_Raise/1.jpg'],
    plank: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Plank/1.jpg'],
    birdDog: ['https://hips.hearstapps.com/hmg-prod/images/bird-dog-exercise-1674234348.jpg?crop=1.00xw:1.00xh;0,0&resize=1200:*'],
    sidePlank: ['https://hips.hearstapps.com/hmg-prod/images/side-plank-1549646915.jpg?resize=1200:*'],
    deadBug: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Dead_Bug/1.jpg'],
    catCow: ['https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cat_Stretch/0.jpg', 'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Cat_Stretch/1.jpg'],
};

// --- Antrenman Planı (Talimatlar Eklendi) ---
const initialWorkoutPlan = [
    { 
        id: 'day1', 
        title: 'Gün 1: İtme (Göğüs, Omuz, Arka Kol)', 
        icon: Flame, 
        exercises: [
            { id: 'd1e1', name: 'Floor Dumbbell Chest Press', target: '3 set x 12-15 tekrar', images: exerciseImages.floorPress, instructions: ["Sırt üstü mata uzanın.", "Dambılları göğüs hizanızda, avuç içleri birbirine bakacak şekilde tutun.", "Kollarınızı uzatarak ve göğsünüzü sıkarak dambılları yukarı doğru itin.", "Üstte duraklayın, ardından yavaşça başlangıç pozisyonuna indirin."] },
            { id: 'd1e2', name: 'Diz Üstü Şınav', target: '3 set x Maksimum tekrar', images: exerciseImages.kneePushup, instructions: ["Ellerinizi omuz genişliğinde açarak başlayın.", "Vücudunuzun alt kısmını dizlerinizin üzerinde dinlendirin.", "Karın ve kalça kaslarınızı sıkarak vücudunuzu yere yaklaştırın.", "Göğsünüzle yeri hafifçe iterek başlangıç pozisyonuna dönün."] },
            { id: 'd1e3', name: 'Seated Dumbbell Lateral Raise', target: '3 set x 12-15 tekrar', images: exerciseImages.lateralRaise, instructions: ["Bir sehpaya oturun, ayaklarınız yere sağlam bassın.", "Her iki elinize bir dambıl alın, avuç içleri vücudunuza dönük olsun.", "Dirseklerinizi hafifçe bükülü tutarak dambılları yanlara doğru kaldırın.", "Omuzlarınızla aynı hizaya gelince yavaşça indirin."] },
            { id: 'd1e4', name: 'Dumbbell Overhead Triceps Extension', target: '3 set x 12-15 tekrar', images: exerciseImages.tricepsExtension, instructions: ["Bir dambılı iki elinizle başınızın üzerinde tutun.", "Dirseklerinizi bükerek dambılı yavaşça başınızın arkasına indirin.", "Dirseklerinizi sabit tutarak dambılı tekrar yukarı kaldırın.", "Hareketi yaparken üst kolunuzu mümkün olduğunca sabit tutun."] }
        ] 
    },
    { 
        id: 'day2', 
        title: 'Gün 2: Çekme (Sırt, Biceps, Ön Kol)', 
        icon: Dumbbell, 
        exercises: [
            { id: 'd2e1', name: 'One-Arm Dumbbell Row (Destekli)', target: '3 set x 10-12 tekrar (her kol)', images: exerciseImages.oneArmRow, instructions: ["Bir dizinizi ve aynı taraftaki elinizi sehpaya koyun.", "Diğer elinizle dambılı alın, sırtınızı düz tutun.", "Dambılı nefes vererek karnınıza doğru çekin, sırt kaslarınızı sıkın.", "Nefes alarak yavaşça başlangıç pozisyonuna indirin."] },
            { id: 'd2e2', name: "Farmer's Walk (Çiftçi Yürüyüşü)", target: '3 set x 45-60 saniye', images: exerciseImages.farmersWalk, instructions: ["Her iki elinize ağır birer dambıl alın.", "Dik durun, omuzlarınızı geriye çekin ve karın kaslarınızı sıkın.", "Belirlenen süre boyunca küçük ve kontrollü adımlarla yürüyün.", "Sırtınızın dik duruşunu bozmamaya özen gösterin."] },
            { id: 'd2e3', name: 'Dumbbell Biceps Curl', target: '3 set x 12-15 tekrar', images: exerciseImages.bicepsCurl, instructions: ["Ayakta dik durun, avuç içleriniz karşıya bakacak şekilde dambılları tutun.", "Dirseklerinizi vücudunuza yakın tutarak dambılları omuzlarınıza doğru kaldırın.", "Biceps kaslarınızı tepede sıkın.", "Yavaş ve kontrollü bir şekilde başlangıç pozisyonuna indirin."] },
            { id: 'd2e4', name: 'Glute Bridge (Kalça Köprüsü)', target: '3 set x 15 tekrar', images: exerciseImages.gluteBridge, instructions: ["Sırt üstü uzanın, dizlerinizi bükün ve ayaklarınızı yere basın.", "Kollarınızı yanlarda, avuç içleriniz yukarı bakacak şekilde tutun.", "Kalçanızı sıkarak yavaşça yukarı kaldırın.", "Vücudunuz omuzlarınızdan dizlerinize düz bir çizgi oluşturduğunda duraklayın ve yavaşça inin."] }
        ] 
    },
    { 
        id: 'day3', 
        title: 'Gün 3: Bacak & Kalça', 
        icon: Dumbbell, 
        exercises: [
            { id: 'd3e1', name: 'Dumbbell Goblet Squat', target: '3 set x 10-12 tekrar', images: exerciseImages.gobletSquat, instructions: ["Bir dambılı dikey olarak iki elinizle göğsünüzün önünde tutun.", "Ayaklarınızı omuz genişliğinde açın, sırtınızı dik tutun.", "Kalçanızı geriye ve aşağıya doğru indirerek çömelin.", "Topuklarınızdan güç alarak başlangıç pozisyonuna yükselin."] },
            { id: 'd3e2', name: 'Dumbbell Lunges', target: '3 set x 10-12 tekrar (her bacak)', images: exerciseImages.lunges, instructions: ["Her iki elinize birer dambıl alın.", "Bir bacağınızla öne doğru büyük bir adım atın.", "Her iki dizinizi de 90 derece bükerek vücudunuzu alçaltın, arka diziniz yere değmesin.", "Öndeki ayağınızdan güç alarak başlangıç pozisyonuna dönün ve diğer bacakla tekrarlayın."] },
            { id: 'd3e3', name: 'Glute Bridge (Dambıl Karında)', target: '3 set x 15 tekrar', images: exerciseImages.gluteBridge, instructions: ["Sırt üstü uzanın, dizleriniz bükülü olsun ve kalçanızın üzerine bir dambıl yerleştirin.", "Dambılı ellerinizle sabit tutarak kalçanızı yukarı kaldırın.", "Tepede kalça kaslarınızı iyice sıkın.", "Yavaşça ve kontrollü bir şekilde başlangıç pozisyonuna inin."] },
            { id: 'd3e4', name: 'Dumbbell Calf Raise', target: '3 set x 20 tekrar', images: exerciseImages.calfRaise, instructions: ["Ayakta dik durun, her iki elinizde dambıl tutun.", "Topuklarınızı yerden kaldırarak parmak ucuna yükselin.", "Baldır kasınızı sıkın ve kontrollü şekilde inin.", "Hareketi yavaş ve odaklanarak yapın."] }
        ] 
    },
    { 
        id: 'day4', 
        title: 'Gün 4: Merkez Bölge (Core) & Mobilite', 
        icon: Target, 
        exercises: [
            { id: 'd4e1', name: 'Plank', target: '3 set x 30-60 saniye', images: exerciseImages.plank, instructions: ["Yüzüstü pozisyonda, dirsekleriniz omuzlarınızın altında olacak şekilde durun.", "Vücudunuzu kaldırın, baştan topuklara kadar düz bir çizgi oluşturun.", "Karın ve kalça kaslarınızı sıkarak pozisyonu koruyun.", "Belinizin çukurlaşmasına izin vermeyin."] },
            { id: 'd4e2', name: 'Bird-Dog', target: '3 set x 10-12 tekrar (her taraf)', images: exerciseImages.birdDog, instructions: ["Dört ayak pozisyonunda başlayın (eller ve dizler yerde).", "Karın kaslarınızı sıkarak, zıt kol ve bacağınızı aynı anda düz bir şekilde uzatın.", "Kalçalarınızı ve omuzlarınızı yere paralel tutun.", "Yavaşça başlangıç pozisyonuna dönün ve diğer taraf için tekrarlayın."] },
            { id: 'd4e3', name: 'Side Plank (Yan Plank)', target: '3 set x 20-30 saniye (her yan)', images: exerciseImages.sidePlank, instructions: ["Yan tarafınıza uzanın, alttaki dirseğiniz omzunuzun altında olsun.", "Kalçanızı yerden kaldırarak vücudunuzla düz bir çizgi oluşturun.", "Pozisyonu korurken karın kaslarınızı sıkın.", "Süreyi tamamladıktan sonra diğer taraf için tekrarlayın."] },
            { id: 'd4e4', name: 'Dead Bug (Ölü Böcek)', target: '3 set x 10-12 tekrar (her taraf)', images: exerciseImages.deadBug, instructions: ["Sırt üstü uzanın, kol ve bacaklarınızı 90 derecelik açıyla havaya kaldırın.", "Belinizi yere bastırarak karın kaslarınızı aktif hale getirin.", "Zıt kol ve bacağınızı yavaşça yere doğru indirin, ancak yere değdirmeyin.", "Kontrollü bir şekilde başlangıç pozisyonuna dönün ve diğer taraf için tekrarlayın."] },
            { id: 'd4e5', name: 'Rahatlatıcı Esneme (Cat-Cow)', target: '5 dakika', images: exerciseImages.catCow, instructions: ["Dört ayak pozisyonunda başlayın.", "Nefes alırken sırtınızı çukurlaştırın ve başınızı kaldırın (İnek pozu).", "Nefes verirken sırtınızı yuvarlayın, çenenizi göğsünüze yaklaştırın (Kedi pozu).", "Bu iki poz arasında yavaş ve akıcı bir şekilde hareket edin."] }
        ] 
    }
];


// --- Beslenme Rehberi (Değişiklik yok) ---
const nutritionGuide = {
    title: "Kilo Alma Odaklı Beslenme Rehberi",
    principles: ["Amaç: Günde yaklaşık 2700-3000 kcal almak.","Her gün en az 2.5 - 3 litre su iç.","Öğünleri atlama. Vücudunu sürekli besleyerek kas gelişimini destekle.","İşlenmiş şeker, paketli ürünler ve sağlıksız yağlardan uzak dur."],
    mealPlans: [{dayType: "Ağır Antrenman Günleri (İtme, Çekme, Bacak)",description: "Bu günlerde enerji için karbonhidrat alımı yüksek olmalı.",meals: {"Kahvaltı": "Yulaf ezmesi (süt, bal, fındık), 2-3 haşlanmış yumurta.","Ara Öğün 1": "1 muz ve 1 avuç badem.","Öğle Yemeği": "150-200gr tavuk/balık, 1 tabak bulgur/tam buğday makarna, salata.","Antrenman Öncesi": "2 dilim tam buğday ekmeği üzeri yer fıstığı ezmesi, 1 bardak süt.","Akşam Yemeği": "150-200gr kırmızı et/hindi, fırında patates, buharda sebze.","Gece Öğünü": "1 kase lor peyniri veya süzme yoğurt."}},{dayType: "Hafif Antrenman & Dinlenme Günleri (Core & Mobilite, Boş Günler)",description: "Bu günlerde karbonhidratı hafif azaltıp, protein ve sağlıklı yağları ön planda tut.",meals: {"Kahvaltı": "3-4 yumurtalı omlet (bol yeşillikli, lor peynirli), 1 dilim tam buğday ekmeği.","Ara Öğün 1": "1 kase yoğurt ve 1 avuç ceviz.","Öğle Yemeği": "Büyük bir kase salata (üzerine 150gr ton balığı/tavuk, bol zeytinyağı).","Ara Öğün 2": "1 adet yeşil elma ve bir avuç fındık.","Akşam Yemeği": "200gr ızgara somon veya hindi, bol yeşil salata veya fırınlanmış sebzeler.","Gece Öğünü": "1 bardak kefir veya 1 kase süzme yoğurt."}}]
};

// --- Bileşenler ---
const ExerciseImage = ({ images, speed = 800 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    useEffect(() => {
        if (!images || images.length < 2) return;
        const timer = setInterval(() => {
            setCurrentImageIndex(prevIndex => (prevIndex + 1) % images.length);
        }, speed);
        return () => clearInterval(timer);
    }, [images, speed]);

    if (!images || images.length === 0) return <p className="text-gray-400">Animasyon bulunamadı.</p>;
    
    return <img src={images[currentImageIndex]} alt="Egzersiz animasyonu" className="rounded-lg border-2 border-gray-600 max-w-xs w-full" loading="lazy" />;
};

const ExerciseCard = ({ exercise, isCompleted, onToggle }) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <div className={`transition-all duration-300 ease-in-out rounded-lg p-4 mb-3 ${isCompleted ? 'bg-green-900/50 border-green-600' : 'bg-gray-800/80 border-gray-600'} border-2`}>
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <button onClick={onToggle} className="mr-4 flex-shrink-0 hover:scale-110 transition-transform" aria-label={`${exercise.name} - ${isCompleted ? 'Tamamlandı' : 'Tamamlanmadı'}`}>
                        {isCompleted ? <CheckCircle className="w-8 h-8 text-green-400" /> : <div className="w-8 h-8 border-2 border-gray-500 rounded-full hover:border-green-400 transition-colors"></div>}
                    </button>
                    <div>
                        <h4 className="font-bold text-lg text-white">{exercise.name}</h4>
                        <p className="text-sm text-gray-300">{exercise.target}</p>
                    </div>
                </div>
                <button onClick={() => setShowInfo(!showInfo)} className="p-2 rounded-full hover:bg-gray-700 flex-shrink-0 transition-colors" aria-label="Hareketi göster/gizle">
                    {showInfo ? <ChevronUp className="w-6 h-6 text-gray-300" /> : <ChevronDown className="w-6 h-6 text-gray-300" />}
                </button>
            </div>
            {showInfo && (
                <div className="mt-4 grid md:grid-cols-2 gap-4 items-center">
                    <div className="flex justify-center">
                        <ExerciseImage images={exercise.images} />
                    </div>
                    <div className="p-2">
                        <h5 className="font-bold text-md text-cyan-300 mb-2">Nasıl Yapılır?</h5>
                        <ul className="list-disc list-inside space-y-2 text-gray-300">
                            {exercise.instructions.map((step, index) => <li key={index}>{step}</li>)}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

const WorkoutDay = ({ day, progress, onToggleExercise, onStartWorkout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const completedCount = day.exercises.filter(ex => progress[ex.id]).length;
    const totalCount = day.exercises.length;
    const completionPercentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;
    
    return (
        <div className="mb-6 bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg overflow-hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="w-full p-5 text-left flex justify-between items-center hover:bg-gray-800 transition-colors" aria-expanded={isOpen}>
                <div className="flex items-center">
                    <day.icon className="w-8 h-8 mr-4 text-cyan-400" />
                    <div>
                        <h3 className="text-xl font-bold text-white">{day.title}</h3>
                        <p className="text-cyan-300">{completedCount} / {totalCount} tamamlandı</p>
                    </div>
                </div>
                <div className="flex items-center">
                    <div className="w-24 bg-gray-700 rounded-full h-2.5 mr-4">
                        <div className="bg-cyan-500 h-2.5 rounded-full transition-all duration-500" style={{ width: `${completionPercentage}%` }}></div>
                    </div>
                    {isOpen ? <ChevronUp className="w-6 h-6 text-white" /> : <ChevronDown className="w-6 h-6 text-white" />}
                </div>
            </button>
            {isOpen && (
                <div className="p-5 border-t border-gray-700">
                    {day.exercises.map(exercise => (
                        <ExerciseCard key={exercise.id} exercise={exercise} isCompleted={!!progress[exercise.id]} onToggle={() => onToggleExercise(exercise.id)} />
                    ))}
                     <button 
                        onClick={() => onStartWorkout(day)}
                        className="mt-4 w-full bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                    >
                        <Dumbbell className="w-5 h-5 mr-2" /> Antrenmanı Başlat
                    </button>
                </div>
            )}
        </div>
    );
};

const NutritionGuide = () => (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-4 text-amber-400">{nutritionGuide.title}</h2>
        <div className="mb-6 p-4 bg-gray-800/80 rounded-lg">
            <h3 className="font-bold text-lg mb-2 flex items-center"><Info className="w-5 h-5 mr-2 text-amber-400"/>Temel Prensipler</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-300">{nutritionGuide.principles.map((principle, index) => <li key={index}>{principle}</li>)}</ul>
        </div>
        {nutritionGuide.mealPlans.map((plan, index) => (
            <div key={index} className="mb-4 p-4 bg-gray-800/80 rounded-lg">
                <h3 className="font-bold text-lg text-amber-300">{plan.dayType}</h3>
                <p className="text-sm text-gray-400 mb-3">{plan.description}</p>
                <div className="space-y-2">{Object.entries(plan.meals).map(([mealName, mealDesc]) => (<div key={mealName}><span className="font-semibold text-white">{mealName}:</span><span className="text-gray-300 ml-2">{mealDesc}</span></div>))}</div>
            </div>
        ))}
    </div>
);

const MeasurementsTracker = ({ measurements, onSave }) => {
    const [form, setForm] = useState({ weight: '', arm: '', chest: '', waist: '', hip: '' });
    const handleInputChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const handleSave = () => {
        if (!Object.values(form).some(v => v.trim() !== '')) { alert('Lütfen en az bir ölçüm girin.'); return; }
        const newMeasurement = { date: new Date().toISOString().split('T')[0], ...Object.entries(form).reduce((acc, [key, value]) => { acc[key] = parseFloat(value) || 0; return acc; }, {}) };
        onSave(newMeasurement);
        setForm({ weight: '', arm: '', chest: '', waist: '', hip: '' });
    };
    const chartData = measurements.map(m => ({name: m.date.substring(5), Kilo: m.weight, Kol: m.arm, Göğüs: m.chest, Bel: m.waist, Kalça: m.hip}));

    return (
        <div className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl shadow-lg p-6 text-white space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center"><TrendingUp className="mr-2"/>Gelişim Grafiği</h2>
                {measurements.length > 1 ? (
                    <div className="w-full h-72 bg-gray-800/80 p-2 rounded-lg">
                        <ResponsiveContainer>
                            <LineChart data={chartData}><CartesianGrid strokeDasharray="3 3" stroke="#4A5568" /><XAxis dataKey="name" stroke="#A0AEC0" /><YAxis stroke="#A0AEC0" /><Tooltip contentStyle={{ backgroundColor: '#1A202C', border: '1px solid #4A5568', borderRadius: '8px' }} /><Legend /><Line type="monotone" dataKey="Kilo" stroke="#8884d8" activeDot={{ r: 8 }} connectNulls /><Line type="monotone" dataKey="Kol" stroke="#82ca9d" connectNulls /><Line type="monotone" dataKey="Göğüs" stroke="#ffc658" connectNulls /><Line type="monotone" dataKey="Bel" stroke="#ff7300" connectNulls /><Line type="monotone" dataKey="Kalça" stroke="#8dd1e1" connectNulls /></LineChart>
                        </ResponsiveContainer>
                    </div>
                ) : (<div className="text-center py-12 text-gray-400"><Ruler className="w-16 h-16 mx-auto mb-4 opacity-50" /><p>Grafiği görmek için en az 2 ölçüm eklemelisiniz.</p></div>)}
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400">Yeni Ölçüm Ekle</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 items-end">
                    <InputField label="Kilo (kg)" name="weight" value={form.weight} onChange={handleInputChange} /><InputField label="Kol (cm)" name="arm" value={form.arm} onChange={handleInputChange} /><InputField label="Göğüs (cm)" name="chest" value={form.chest} onChange={handleInputChange} /><InputField label="Bel (cm)" name="waist" value={form.waist} onChange={handleInputChange} /><InputField label="Kalça (cm)" name="hip" value={form.hip} onChange={handleInputChange} />
                    <button onClick={handleSave} className="col-span-2 md:col-span-1 bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center justify-center h-10"><Save className="w-4 h-4 mr-2" />Kaydet</button>
                </div>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4 text-purple-400 flex items-center"><Calendar className="mr-2"/>Ölçüm Geçmişi</h2>
                {measurements.length > 0 ? (<div className="overflow-x-auto"><table className="w-full text-left bg-gray-800/80 rounded-lg"><thead><tr className="border-b border-gray-700"><th className="p-3">Tarih</th><th className="p-3">Kilo</th><th className="p-3">Kol</th><th className="p-3">Göğüs</th><th className="p-3">Bel</th><th className="p-3">Kalça</th></tr></thead><tbody>{measurements.slice().reverse().map((m, i) => (<tr key={i} className="border-b border-gray-700 last:border-0"><td className="p-3">{m.date}</td><td className="p-3">{m.weight || '-'} {m.weight ? 'kg' : ''}</td><td className="p-3">{m.arm || '-'} {m.arm ? 'cm' : ''}</td><td className="p-3">{m.chest || '-'} {m.chest ? 'cm' : ''}</td><td className="p-3">{m.waist || '-'} {m.waist ? 'cm' : ''}</td><td className="p-3">{m.hip || '-'} {m.hip ? 'cm' : ''}</td></tr>))}</tbody></table></div>) : (<div className="text-center py-8 text-gray-400"><Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" /><p>Henüz ölçüm geçmişi yok.</p></div>)}
            </div>
        </div>
    );
};

const InputField = ({ label, name, value, onChange }) => (<div><label htmlFor={name} className="block text-sm font-medium text-gray-300 mb-1">{label}</label><input type="number" name={name} id={name} value={value} onChange={onChange} className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg p-2 focus:ring-purple-500 focus:border-purple-500 h-10 transition-colors" step="0.1" min="0" /></div>);
const TabButton = ({ icon: Icon, label, activeTab, name, onClick, color }) => { const isActive = activeTab === name; const colors = { cyan: 'bg-cyan-500', purple: 'bg-purple-500', amber: 'bg-amber-500', green: 'bg-green-500' }; return (<button onClick={() => onClick(name)} className={`w-1/4 py-2 px-2 sm:px-4 rounded-full text-center font-semibold transition-all duration-300 flex items-center justify-center ${isActive ? `${colors[color]} text-white shadow-md` : 'text-gray-300 hover:text-white hover:bg-gray-700'}`} aria-selected={isActive}><Icon className="inline-block w-5 h-5 mr-0 sm:mr-2" /><span className="hidden sm:inline">{label}</span></button>); };

// --- YENİ BİLEŞEN: Antrenman Geçmişi ---
const WorkoutHistory = ({ progressByDate }) => {
    const sortedDates = Object.keys(progressByDate).sort((a, b) => new Date(b) - new Date(a));
    
    const getDayName = (dateStr) => {
        const days = ['Pazar', 'Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi'];
        return days[new Date(dateStr).getDay()];
    };

    const getCompletedExercises = (date) => {
        const dayProgress = progressByDate[date];
        const completed = [];
        
        initialWorkoutPlan.forEach(day => {
            day.exercises.forEach(exercise => {
                if (dayProgress[exercise.id]) {
                    completed.push({
                        name: exercise.name,
                        dayTitle: day.title
                    });
                }
            });
        });
        
        return completed;
    };

    return (
        <div className="space-y-6">
            {sortedDates.map(date => {
                const completedExercises = getCompletedExercises(date);
                if (completedExercises.length === 0) return null;

                return (
                    <div key={date} className="bg-gray-900/70 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div>
                                <h3 className="text-xl font-bold text-white">{new Date(date).toLocaleDateString('tr-TR')}</h3>
                                <p className="text-green-400">{getDayName(date)}</p>
                            </div>
                            <div className="bg-green-900/50 px-4 py-2 rounded-full">
                                <span className="text-green-400">{completedExercises.length} egzersiz tamamlandı</span>
                            </div>
                        </div>
                        <div className="space-y-3">
                            {completedExercises.map((exercise, idx) => (
                                <div key={idx} className="bg-gray-800/50 p-4 rounded-lg flex items-center">
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                                    <div>
                                        <p className="text-white font-medium">{exercise.name}</p>
                                        <p className="text-sm text-gray-400">{exercise.dayTitle}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
            {sortedDates.length === 0 && (
                <div className="text-center py-12 text-gray-400">
                    <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Henüz tamamlanmış antrenman bulunmuyor.</p>
                </div>
            )}
        </div>
    );
};

// --- YENİ BİLEŞEN: İnteraktif Antrenman Ekranı ---
const WorkoutSession = ({ workout, onFinish }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [currentSet, setCurrentSet] = useState(1);
    const currentExercise = workout.exercises[currentIndex];
    // Set sayısını hedeften çek
    const totalSets = parseInt(currentExercise.target.match(/(\d+) set/)?.[1] || '3');

    const goToNext = () => {
        setCurrentSet(1);
        if (currentIndex < workout.exercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const goToPrev = () => {
        setCurrentSet(1);
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const handleSetComplete = () => {
        if (currentSet < totalSets) {
            setCurrentSet(currentSet + 1);
        } else {
            // Son set tamamlandıysa otomatik olarak sonraki egzersize geç
            if (currentIndex < workout.exercises.length - 1) {
                setCurrentSet(1);
                setCurrentIndex(currentIndex + 1);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-95 backdrop-blur-md p-4 flex flex-col items-center justify-center z-50">
            <div className="w-full max-w-4xl mx-auto text-white">
                <header className="text-center mb-6">
                    <p className="text-lg text-cyan-300">{workout.title}</p>
                    <h2 className="text-3xl sm:text-4xl font-bold">{currentExercise.name}</h2>
                    <p className="text-xl text-gray-300 mt-1">{currentExercise.target}</p>
                </header>

                <main className="grid md:grid-cols-2 gap-6 items-center mb-8">
                    <div className="bg-gray-800 p-4 rounded-lg flex justify-center">
                        <ExerciseImage images={currentExercise.images} speed={900} />
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg">
                        <h3 className="font-bold text-xl text-cyan-300 mb-3 flex items-center">
                            <BookOpen className="w-5 h-5 mr-2" /> Nasıl Yapılır?
                        </h3>
                        <ul className="list-decimal list-inside space-y-3 text-gray-200">
                            {currentExercise.instructions.map((step, index) => (
                                <li key={index}>{step}</li>
                            ))}
                        </ul>
                        <div className="mt-6 flex flex-col items-center">
                            <span className="text-lg font-bold text-cyan-400 mb-2">Set: {currentSet} / {totalSets}</span>
                            {currentSet < totalSets ? (
                                <button
                                    onClick={handleSetComplete}
                                    className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 text-white rounded-full font-bold mb-2"
                                >
                                    Seti Tamamla
                                </button>
                            ) : (
                                <button
                                    onClick={handleSetComplete}
                                    className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold mb-2"
                                >
                                    Egzersizi Bitir
                                </button>
                            )}
                        </div>
                    </div>
                </main>

                <footer className="flex items-center justify-between">
                    <button 
                        onClick={goToPrev} 
                        disabled={currentIndex === 0}
                        className="bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center"
                    >
                        <ArrowLeft className="w-5 h-5 mr-2" /> Önceki
                    </button>
                    
                    <span className="text-lg font-semibold">{currentIndex + 1} / {workout.exercises.length}</span>

                    {currentIndex === workout.exercises.length - 1 && currentSet === totalSets ? (
                         <button 
                            onClick={onFinish} 
                            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center"
                        >
                            <CheckCircle className="w-5 h-5 mr-2" /> Antrenmanı Bitir
                        </button>
                    ) : (
                        <button 
                            onClick={goToNext}
                            disabled={currentSet !== totalSets}
                            className={`bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-6 rounded-lg transition-colors flex items-center ${currentSet !== totalSets ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            Sonraki <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    )}
                </footer>
            </div>
             <button onClick={onFinish} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <XCircle size={32} />
            </button>
        </div>
    );
};


// --- Ana Uygulama ---
export default function App() {
    const [activeTab, setActiveTab] = useState('workout');
    const [progressByDate, setProgressByDate] = useState({});
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const [measurements, setMeasurements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [workoutSession, setWorkoutSession] = useState(null); // Yeni state

    useEffect(() => {
        const savedProgress = localStorage.getItem('fitness-progress-by-date');
        const savedMeasurements = localStorage.getItem('fitness-measurements');
        if (savedProgress) setProgressByDate(JSON.parse(savedProgress));
        if (savedMeasurements) setMeasurements(JSON.parse(savedMeasurements));
        setIsLoading(false);
    }, []);

    useEffect(() => { if (!isLoading) localStorage.setItem('fitness-progress-by-date', JSON.stringify(progressByDate)); }, [progressByDate, isLoading]);
    useEffect(() => { if (!isLoading) localStorage.setItem('fitness-measurements', JSON.stringify(measurements)); }, [measurements, isLoading]);

    const handleToggleExercise = (exerciseId) => {
        setProgressByDate(prev => {
            const dayProgress = prev[selectedDate] || {};
            return { ...prev, [selectedDate]: { ...dayProgress, [exerciseId]: !dayProgress[exerciseId] } };
        });
    };

    const handleSaveMeasurement = (newMeasurement) => {
        setMeasurements(prev => [...prev, newMeasurement].sort((a, b) => new Date(a.date) - new Date(b.date)));
    };

    const handleResetProgress = () => { if (window.confirm('Tüm antrenman ilerlemesini sıfırlamak istediğinizden emin misiniz?')) setProgressByDate({}); };
    
    // Antrenman başlatma ve bitirme fonksiyonları
    const handleStartWorkout = (day) => setWorkoutSession(day);
    const handleFinishWorkout = () => setWorkoutSession(null);

    if (isLoading) {
        return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white"><div className="text-center"><Dumbbell className="animate-spin w-12 h-12 text-cyan-400 mx-auto mb-4" /><p className="text-xl">Program Yükleniyor...</p></div></div>;
    }
    
    // Eğer interaktif mod aktifse, sadece o ekranı göster
    if (workoutSession) {
        return <WorkoutSession workout={workoutSession} onFinish={handleFinishWorkout} />;
    }

    const totalExercises = initialWorkoutPlan.flatMap(day => day.exercises).length;
    const todayProgress = progressByDate[selectedDate] || {};
    const completedExercises = Object.values(todayProgress).filter(Boolean).length;
    const overallCompletion = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 text-white p-2 sm:p-4 md:p-6 font-sans">
            <div className="w-full max-w-4xl mx-auto px-4">
                <header className="text-center mb-10">
                    <h1 className="text-5xl sm:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-amber-400 mb-6 drop-shadow-[0_2px_8px_rgba(0,255,255,0.3)] tracking-tight">TechFitt</h1>
                    <div className="bg-gradient-to-r from-cyan-900/60 via-purple-900/60 to-amber-900/60 rounded-xl p-5 inline-block shadow-lg border border-cyan-500/30">
                        <div className="flex items-center justify-center space-x-6 text-gray-200 text-lg">
                            <div className="flex items-center gap-2"><User className="w-5 h-5 text-cyan-400" /><span>Yaş: 23</span></div>
                            <div className="flex items-center gap-2"><Ruler className="w-5 h-5 text-purple-400" /><span>Boy: 1.88m</span></div>
                            <div className="flex items-center gap-2"><Target className="w-5 h-5 text-amber-400" /><span>Hedef: Kilo Alma</span></div>
                        </div>
                    </div>
                </header>

                <div className="bg-gradient-to-r from-cyan-900/60 via-gray-900/80 to-purple-900/60 border border-cyan-500/30 rounded-2xl shadow-2xl p-8 mb-10">
                    <h3 className="font-bold text-xl text-white mb-4 flex items-center tracking-wide"><TrendingUp className="w-6 h-6 mr-2 text-cyan-400 animate-pulse" />Haftalık Antrenman İlerlemesi</h3>
                    <div className="w-full bg-gray-800 rounded-full h-5 mb-3 shadow-inner">
                        <div className="bg-gradient-to-r from-cyan-400 via-green-400 to-amber-400 h-5 rounded-full transition-all duration-500 shadow-[0_0_12px_2px_rgba(0,255,255,0.3)]" style={{ width: `${overallCompletion}%` }}></div>
                    </div>
                    <div className="flex justify-between text-base font-semibold">
                        <span className="text-cyan-300">{completedExercises} / {totalExercises} egzersiz tamamlandı</span>
                        <span className="text-amber-300">{Math.round(overallCompletion)}%</span>
                    </div>
                </div>

                <div className="flex justify-center items-center mb-10 bg-gradient-to-r from-cyan-900/40 via-gray-800/80 to-purple-900/40 p-2 rounded-full max-w-xl mx-auto border border-cyan-500/30 shadow-lg">
                    <TabButton icon={Dumbbell} label="Antrenman" activeTab={activeTab} name="workout" onClick={setActiveTab} color="cyan" />
                    <TabButton icon={Calendar} label="Geçmiş" activeTab={activeTab} name="history" onClick={setActiveTab} color="green" />
                    <TabButton icon={Ruler} label="Ölçümlerim" activeTab={activeTab} name="measurements" onClick={setActiveTab} color="purple" />
                    <TabButton icon={Utensils} label="Beslenme" activeTab={activeTab} name="nutrition" onClick={setActiveTab} color="amber" />
                </div>

                <main className="mb-10">
                    {activeTab === 'workout' && (
                        <div>
                            <div className="mb-6 flex flex-col sm:flex-row items-center gap-3">
                                <label htmlFor="workout-date" className="text-base text-cyan-300 font-bold tracking-wide">Tarih seç:</label>
                                <input id="workout-date" type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="bg-gray-800 border border-cyan-500 text-white rounded-xl p-3 focus:ring-cyan-400 focus:border-cyan-400 shadow-md" max={new Date().toISOString().split('T')[0]} />
                            </div>
                            {initialWorkoutPlan.map(day => (<WorkoutDay key={day.id} day={day} progress={progressByDate[selectedDate] || {}} onToggleExercise={handleToggleExercise} onStartWorkout={handleStartWorkout} />))}
                        </div>
                    )}
                    {activeTab === 'history' && <WorkoutHistory progressByDate={progressByDate} />}
                    {activeTab === 'measurements' && <MeasurementsTracker measurements={measurements} onSave={handleSaveMeasurement} />}
                    {activeTab === 'nutrition' && <NutritionGuide />}
                </main>

                <footer className="text-center space-y-6 mt-8">
                    {activeTab === 'workout' && <button onClick={handleResetProgress} className="bg-gradient-to-r from-red-800 via-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-6 rounded-full transition-colors flex items-center mx-auto border border-red-600 shadow-lg"><RefreshCw className="w-5 h-5 mr-2 animate-spin" />Antrenman İlerlemesini Sıfırla</button>}
                    <div className="text-center">
                        <p className="text-base text-cyan-400 mb-2 font-semibold tracking-wide">💪 Bu bir maraton, sprint değil. Sabırlı ol ve kendine iyi bak.</p>
                        <p className="text-xs text-gray-400">Veriler tarayıcınızda güvenle saklanıyor.</p>
                    </div>
                </footer>
            </div>
        </div>
    );
}