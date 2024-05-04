import React, { PropsWithChildren, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import {
  Search,
  Plus,
  Home,
  UtensilsCrossed,
  icons,
  Crosshair,
} from "lucide-react-native";
import Calendar from "@/assets/svg/calendar";
import { Tables } from "@/lib/types/supabase";
import SwipeableRow from "./ui/swipeable-row";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { router } from "expo-router";

export const PointsList: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollView
      contentContainerStyle={{ gap: 12 }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

type PointsListItemProps = {
  point: Tables<"point"> & { category: Tables<"category"> };
  focusPoint: (lat: number, lng: number) => void;
};

export const PointsListItem: React.FC<PointsListItemProps> = ({
  point,
  focusPoint,
}) => {
  const [deleteModalVisible, setDeleteModalVisible] = React.useState(false);
  const Icon = icons[point.category.icon as keyof typeof icons];

  const location = point.name.split(", ");
  const mainLocation = location[0];
  location.shift();
  const subLocation = location.join(", ");

  const queryClient = useQueryClient();

  const deletePointMutation = useMutation({
    mutationFn: async (pointId: number) => {
      const resp = await supabase
        .from("point")
        .delete()
        .eq("id", pointId)
        .select();

      return resp;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["getTripPoints", point.trip_id.toString()],
      });
    },
    onError: (err) => {
      console.log("err", err);
    },
  });

  const handleDelete = () => {
    deletePointMutation.mutate(point.id);
  };

  return (
    <SwipeableRow
      onDelete={() => deletePointMutation.mutate(point.id)}
      onEdit={() =>
        router.navigate(
          "/trip/" +
            point.trip_id.toString() +
            "/editPoint/" +
            point.id.toString()
        )
      }
    >
      <View
        style={{ gap: 12 }}
        className="flex-row items-center p-2 bg-gray-100"
      >
        <View
          style={{ backgroundColor: point.category.color }}
          className="rounded-full h-10 w-10 items-center justify-center"
        >
          <Icon height={"50%"} width={"50%"} className="text-white" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-500 font-bold text-base">
            {mainLocation}
          </Text>
          <Text className="text-gray-500">{subLocation}</Text>
        </View>
        <View className="items-center justify-center">
          <TouchableOpacity
            onPress={() => focusPoint(point.latitude, point.longitude)}
          >
            <Crosshair height={24} width={24} className="text-gray-500" />
          </TouchableOpacity>
        </View>
      </View>
    </SwipeableRow>
  );
};

export const PointsListSeparator = () => {
  return <View className="h-[0.5px] bg-gray-300"></View>;
};
