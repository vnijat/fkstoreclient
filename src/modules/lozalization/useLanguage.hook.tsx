import LocalizedStrings from "localized-strings";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";




function UseLanguage() {
    const lang = useSelector((state: RootState) => state.configs.language);

    const T = useMemo(() => new LocalizedStrings(
        {
            en: {
                dashBoard: 'Dashboard',
                save: 'Save',
                reset: 'Reset',
                delete: 'Delete',
                add: 'Add',
                orders: "Orders",
                scan: 'Scan',
                products: 'Products',
                home: 'Home',
                config: 'Config',
                barcode: 'Barcode',
                quantity: 'Quantity',
                unit: 'Unit',
                pricePerUnit: 'Price per unit',
                totalPrice: 'Total Price',
                name: 'Name',
                description: 'Description',
                category: 'Category',
                supplier: 'Supplier',
                color: 'Color',
                label: 'Label',
                location: 'Location',
                atStock: 'At stock',
                price: 'Price',
                purchases: 'Purchases',
                clients: 'Clients',
                projects: 'Projects',
                project: 'Project',
                purchasePrice: 'Stock price',
                wareHouse: 'Warehouse',
                store: 'Store',
                outOfStock: 'Out щf stock',
                overallPrice: 'Overall зrice',
                clearFilters: 'Clear filters',
                newProduct: 'New Product',
                addNew: 'Add New',
                create: 'Create',
                update: 'Update',
                code: 'Product Code',
                select: 'Select',
                noData: 'no data'
            },
            ru: {
                dashBoard: 'Панел',
                save: 'Сохранить',
                reset: 'Сбросить',
                delete: 'Delete',
                add: 'Add',
                orders: "Заказы",
                scan: 'Сканировать',
                products: 'Продукты',
                home: 'Главный',
                config: 'Конфигурация',
                barcode: 'Баркод',
                quantity: 'Кол-во',
                unit: 'Единица',
                pricePerUnit: 'Цена за единицу',
                totalPrice: 'Итоговая цена',
                name: 'Имя',
                description: 'Описание',
                category: 'Категория',
                supplier: 'Поставщик',
                color: 'Цвет',
                label: 'Ярлык',
                location: 'Расположение',
                atStock: 'На складе',
                price: 'Цена',
                purchases: 'Закупка',
                clients: 'Клиенты',
                projects: 'Проекты',
                project: 'Проект',
                purchasePrice: 'Цена за единицу',
                wareHouse: 'Амбар',
                store: 'Склад',
                outOfStock: 'Нет на складе',
                overallPrice: 'Общая цена',
                clearFilters: 'Очистить фильтры',
                newProduct: 'Новый продукт',
                addNew: 'Добавить новое',
                create: 'Создать',
                update: 'Обновить',
                code: 'Код продукта',
                select: 'Выберите',
                noData: 'Нет данных'
            },
            az: {
                dashBoard: 'Panel',
                orders: "Sifarişlər",
                save: 'Yadda Saxla',
                reset: 'Sıfırla',
                delete: 'Sil',
                add: 'Əlavə et',
                scan: ' Skan edin',
                products: 'Məhsullar',
                home: 'Əsas',
                config: 'Konfiqurasiya',
                barcode: 'Barkod',
                quantity: 'Miqdar',
                unit: 'Vahid',
                pricePerUnit: 'Vahid qiymət',
                totalPrice: 'Ümumi qiymət',
                name: 'Ad',
                description: 'Təsvir',
                category: 'Kateqoriya',
                supplier: 'Təchizatçı',
                color: 'Rəng',
                label: 'Etiket',
                location: 'Məkan',
                atStock: 'Stokda var',
                price: 'Qiymət',
                purchases: 'Alış',
                purchasePrice: 'Vahid qiymət',
                clients: 'Müştərilər',
                projects: 'Layihələr',
                project: 'Layihə',
                wareHouse: 'Anbar',
                store: 'Stok',
                outOfStock: 'Stokda yoxdur',
                overallPrice: 'Ümumi dəyər',
                clearFilters: 'Filteri sıfırla',
                newProduct: 'Yeni məhsul',
                addNew: 'Əlavə et',
                create: 'Yarat',
                update: 'Yenilə',
                code: 'Məhsul kodu',
                select: 'Seçin',
                noData: 'Məlumat yoxdur'
            }
        },
        {
            customLanguageInterface: () => lang
        }
    ), [lang]);

    return T;
}


export default UseLanguage;