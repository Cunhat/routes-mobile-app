import React from "react";
import { View, Text, TextInput, KeyboardTypeOptions } from "react-native";

type TextInputProps = {
  placeholder: string;
  value: string;
  onChangeText: (value: string) => void;
  label: string;
  secureTextEntry?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  keyboardType?: KeyboardTypeOptions;
};

export const CustomTextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  label,
  secureTextEntry,
  autoCapitalize,
  keyboardType,
}) => {
  return (
    <View style={{ gap: 4 }}>
      <Text className="text-base text-sky-500">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#d1d5db"}
        value={value}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        onChangeText={(text) => onChangeText(text)}
        className="h-10 w-full p-2 bg-gray-100 rounded-xl text-gray-600"
        autoCapitalize={autoCapitalize}
      />
    </View>
  );
};
