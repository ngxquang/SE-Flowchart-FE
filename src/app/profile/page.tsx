'use client';

import { ProfileType } from '@/types';
import Image from 'next/image';
import { ButtonSolid, classNames, Input } from '@/components';
import { useState } from 'react';

export default function Profile({
  name,
  email,
  username,
  sex,
  phone,
  address
}: ProfileType) {
  const isValidName = (name: string): boolean => {
    name = name.trim();

    if (name.length < 2) return false;

    const nameRegex =
      /^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯăằẳẵẳẳẵẳăêđơởợýỳỵỷỹ\s]+$/;

    // Kiểm tra tên với biểu thức chính quy
    if (!nameRegex.test(name)) return false;

    // Tách tên thành các phần (theo khoảng trắng)
    const nameParts = name.split(' ');

    // Kiểm tra từng phần của tên (mỗi phần phải có ít nhất 2 ký tự)
    for (const part of nameParts) {
      if (part.length < 2) return false;
    }

    return true;
  };

  const isValidEmail = (email: string): boolean => {
    const emailRegex: RegExp =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return emailRegex.test(email);
  };

  const isValidPhone = (phone: string): boolean => {
    const regex = /^\d{10}$/;
    return regex.test(phone);
  };

  const ValidSex = (sex: string): string => {
    if (!sex) return sex;

    const lowerCased = sex.toLowerCase();

    return lowerCased.charAt(0).toUpperCase() + lowerCased.slice(1);
  };

  const [inputValue_Tentaikhoan, setInputValue_Tentaikhoan] =
    useState<string>(name);
  const [inputValid_Tentaikhoan, setInputValid_Tentaikhoan] = useState<
    'default' | 'success' | 'error'
  >('default');
  const handleInput_Tentaikhoan = (name: string) => {
    setInputValue_Tentaikhoan(name);
    if (name.trim().length === 0) {
      setInputValid_Tentaikhoan('default');
    } else if (name.length > 255 || !isValidName(name)) {
      setInputValid_Tentaikhoan('error');
    } else {
      setInputValid_Tentaikhoan('success');
    }
  };

  const [inputValue_Email, setInputValue_Email] = useState<string>(email);
  const [inputValid_Email, setInputValid_Email] = useState<
    'default' | 'success' | 'error'
  >('default');
  const handleInput_Email = (email: string) => {
    setInputValue_Email(email);
    if (email.trim().length === 0) {
      setInputValid_Email('default');
    } else if (!isValidEmail(email)) {
      setInputValid_Email('error');
    } else {
      setInputValid_Email('success');
    }
  };

  const [inputValue_Gioitinh, setInputValue_Gioitinh] = useState<string>(sex);
  const [inputValid_Gioitinh, setInputValid_Gioitinh] = useState<
    'default' | 'success' | 'error'
  >('default');
  const handleInput_Gioitinh = (gioitinh: string) => {
    setInputValue_Gioitinh(ValidSex(gioitinh));
    if (gioitinh.trim().length === 0) {
      setInputValid_Gioitinh('default');
    } else if (!['Nam', 'Nữ'].some((value) => value === gioitinh)) {
      setInputValid_Gioitinh('error');
    } else {
      setInputValid_Gioitinh('success');
    }
  };

  const [inputValue_Dienthoai, setInputValue_Dienthoai] = useState<string>(phone);
  const [inputValid_Dienthoai, setInputValid_Dienthoai] = useState<
    'default' | 'success' | 'error'
  >('default');
  const handleInputValid_Dienthoai = (phone: string) => {
    setInputValue_Dienthoai(phone);
    if (phone.trim().length === 0) {
      setInputValid_Dienthoai('default');
    } else if (!isValidPhone(phone)) {
      setInputValid_Dienthoai('error');
    } else {
      setInputValid_Dienthoai('success');
    }
  };

  const [inputValue_Diachi, setInputValue_Diachi] = useState<string>(address);
  const [inputValid_Diachi, setInputValid_Diachi] = useState<
    'default' | 'success' | 'error'
  >('default');
  const handleInputValid_Diachi = (address: string) => {
    setInputValue_Diachi(address);
    if (address.trim().length === 0) {
      setInputValid_Diachi('default');
    } else {
      setInputValid_Diachi('success');
    }
  };

  const isValueButton = (): boolean => {
    const hasErrorString =
    inputValue_Tentaikhoan?.trim().length === 0 ||
    inputValue_Gioitinh?.trim().length === 0 ||
    inputValue_Email?.trim().length === 0 ||
    inputValue_Dienthoai?.trim().length === 0 ||
    inputValue_Diachi?.trim().length === 0;
    // Điều kiện để bật nút: ít nhất một trường hợp lệ, không có trường nào bị lỗi
    const allFieldsValid =
      inputValid_Tentaikhoan === 'success' &&
      inputValid_Gioitinh === 'success' &&
      inputValid_Email === 'success' &&
      inputValid_Dienthoai === 'success' &&
      inputValid_Diachi === 'success';

    const hasError =
      inputValid_Tentaikhoan === 'error' ||
      inputValid_Gioitinh === 'error' ||
      inputValid_Email === 'error' ||
      inputValid_Dienthoai === 'error' ||
      inputValid_Diachi === 'error';

    const atLeastOneValid =
      inputValid_Tentaikhoan === 'success' ||
      inputValid_Gioitinh === 'success' ||
      inputValid_Email === 'success' ||
      inputValid_Dienthoai === 'success' ||
      inputValid_Diachi === 'success';

    // Enable button nếu tất cả hợp lệ hoặc ít nhất một trường hợp lệ và không có lỗi (không trường hợp nào được để rỗng)
    return (
      (allFieldsValid || (atLeastOneValid && !hasError)) && hasErrorString
    );
  };

  return (
    <div
      className={classNames(
        'h-full w-full pt-6 sm:max-w-[100%] sm:flex-row md:max-w-[80%] lg:max-w-[60%]'
      )}
    >
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="text-3xl">Tài khoản sinh viên</div>
        <div>
          <Image
            src="/images/default_avt.svg"
            alt="default_avatar"
            width={200}
            height={200}
          />
        </div>
        <div className="text-xl">@{username}</div>
      </div>
      <div
        className={classNames('flex flex-col items-center justify-center pt-3')}
      >
        <div className={classNames('w-full')}>
          <Input
            title="Tên tài khoản"
            placeholder="Nhập họ tên người dùng"
            value={inputValue_Tentaikhoan}
            onChange={handleInput_Tentaikhoan}
            valid={inputValid_Tentaikhoan}
            required={true}
          />
        </div>

        <div className={classNames('w-full')}>
          <Input
            title="Email"
            placeholder="Nhập email người dùng"
            value={inputValue_Email}
            onChange={handleInput_Email}
            valid={inputValid_Email}
            required={true}
          />
        </div>

        <div className={classNames('w-full')}>
          <Input
            title="Giới tính"
            placeholder="Nhập giới tính người dùng"
            value={inputValue_Gioitinh}
            onChange={handleInput_Gioitinh}
            valid={inputValid_Gioitinh}
            required={true}
          />
        </div>

        <div className={classNames('w-full')}>
          <Input
            title="Điện thoại"
            placeholder="Nhập số điện thoại người dùng"
            value={inputValue_Dienthoai}
            onChange={handleInputValid_Dienthoai}
            valid={inputValid_Dienthoai}
            required={true}
            type="number"
          />
        </div>

        <div className={classNames('w-full')}>
          <Input
            title="Địa chỉ"
            placeholder="Nhập địa chỉ người dùng"
            value={inputValue_Diachi}
            onChange={handleInputValid_Diachi}
            valid={inputValid_Diachi}
          />
        </div>
      </div>
      <div className={classNames('flex items-center justify-center')}>
        <ButtonSolid content="Lưu thay đổi" isDisabled={isValueButton()} />
      </div>
    </div>
  );
}
