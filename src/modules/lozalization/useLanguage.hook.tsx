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
                orders: "Orders",
                scan: 'Scan',
                products: 'Products',
                home: 'Home',
                config: 'Config',
                barcode: 'Barcode',
                quantity: 'Quantity',
                unit: 'Unit',
                pricePerUnit: 'Price Per Unit',
                totalPrice: 'Total Price',
                name: 'Name',
                description: 'Description',
                category: 'Category',
                supplier: 'Supplier',
                color: 'Color',
                label: 'Label',
                location: 'Location',
                atStock: 'At Stock',
                price: 'Price'

            },
            ru: {
                dashBoard: 'Панел',
                orders: "Заказы",
                scan: 'Сканировать',
                products: 'Продукты',
                home: 'Главный',
                config: 'Конфигурация',
                barcode: 'Barcode',
                quantity: 'Quantity',
                unit: 'Unit',
                pricePerUnit: 'Price Per Unit',
                totalPrice: 'Total Price',
                name: 'Name',
                description: 'Description',
                category: 'Category',
                supplier: 'Supplier',
                color: 'Color',
                label: 'Label',
                location: 'Location',
                atStock: 'At Stock',
                price: 'Price'
            },
            az: {
                orders: "Orderlər",
            }
        },
        {
            customLanguageInterface: () => lang
        }
    ), [lang]);

    return T;
}


export default UseLanguage;