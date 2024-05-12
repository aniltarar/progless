import React, { useState } from 'react'
import requestUtil from '../utils/requestUtil';

function useCategory() {
    const [categories, setCategories] = useState([])
    const userId = JSON.parse(localStorage.getItem("user")).id;
    
    /** Kullanıcıya ait olan kategorileri döndürür
     * @returns Kategori verilerileri
     */
    const getCategory = async () => {
        let _categoryData = (await requestUtil().get(`/users/${userId}/categories`)).data;
        _categoryData.sort((a,b) => a.id - b.id);
        setCategories(_categoryData)
        return _categoryData
    };

    /** Yeni kategori eklemeyi sağlar
     * @param {string} name Kategori adı
     * @param {string} colorHex Kategori renk id'si
     * @param {number} imageId Kategori ikon id'si
     * @returns Eklenen kategori verileri
     */
    const addCategory = async (name, colorHex, imageId) => {
        let _categoryData = (await requestUtil().post(`users/${userId}/categories`, { name: name, colorHex: colorHex, imageId: parseInt(imageId) })).data;
        await getCategory()
        return _categoryData
    };

    /** Id'si verilen kategoriyi düzenlemeyi sağlar
     * @param {number} categoryId Kategori id'si
     * @param {string} name Kategori adı
     * @param {string} colorHex Kategori renk id'si
     * @param {number} imageId Kategori ikon id'si
     * @returns Düzenlenen kategorinin son halini döndürür
     */
    const editCategory = async (categoryId, name, colorHex, imageId) => {
        let _categoryData = (await requestUtil().put(`users/${userId}/categories/${categoryId}`, { name: name, colorHex: colorHex, imageId: parseInt(imageId) })).data;
        await getCategory()
        return _categoryData
    };

    /** Id'si verilen kategoriyi silmeye yarar
     * @param {number} categoryId Kategori id'si
     * @returns Silinen kategorinin bilgilerini döndürür
     */
    const deleteCategory = async (categoryId) => {
        let _categoryData = (await requestUtil().delete(`/users/${userId}/categories/${categoryId}`)).data;
        await getCategory()
        return _categoryData
    };

    return { categories, getCategory, addCategory, editCategory, deleteCategory }
}

export default useCategory