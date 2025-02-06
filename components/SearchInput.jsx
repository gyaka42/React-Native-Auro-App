import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useState } from "react";

import { icons } from "../constants";

const SearchInput = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View
      className={`border-2 w-full h-16 px-4 bg-black-100 rounded-2xl items-center flex-row ${
        isFocused ? "border-secondary" : "border-black-200 space-x-4"
      }`}
    >
      <TextInput
        className="text-base mt-0.5 text-white flex-1 font-pregular"
        value={value}
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        onChangeText={handleChangeText}
        secureTextEntry={title === "Password" && !showPassword}
        onFocus={() => setIsFocused(true)} // Bij focus: set de status naar true
        onBlur={() => setIsFocused(false)} // Bij verlies van focus: reset de status
        {...props}
      />
      <TouchableOpacity>
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
