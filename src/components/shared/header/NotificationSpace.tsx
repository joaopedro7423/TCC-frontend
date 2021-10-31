import { Flex, Text, VStack, Box } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import NotificationsCard from "./NotificationsCard";
import { AuthContext } from "context/auth";
import { INavigation } from "navigation/INavigation";
import { api } from "services/api";

export default function NotificationSpace() {
  const { user, token } = useContext(AuthContext);

  const [LinkItems, setLinkItems] = useState([] as INavigation[]);

  const [notifi, setNotifi] = useState<NotificationResponse[]>([]);

  type NotificationResponse = {
    id: string;
    description: string;
  };
  useEffect(() => {
    async function GetPropos() {
      const response = await api.get<NotificationResponse[]>("/notifications", {
        headers: {
          authorization: `Bearear ${token}`,
        },
      });

      setNotifi(response.data);
      //console.log(response);
    }
    GetPropos();
  }, []);

  return (
    <Box
      d="flex"
      flexDir="column"
      alignItems="center"
      borderRadius={12}
      p={3}
      bg="gray.100"
      h="100%"
    >
      <Text
        mb={3}
        textAlign="center"
        fontWeight="bold"
        textTransform="uppercase"
        fontSize="md"
      >
        Notificações:
      </Text>

      <VStack
        h='100%'
        maxH='28vh'
        overflowY="scroll"
      
        overflowX="hidden"
        spacing={5}
      >
        {notifi.map((item, index) => (
          <NotificationsCard
            key={index}
            id={item.id}
            description={item.description}
          />
        ))}
      </VStack>
    </Box>
  );
}
