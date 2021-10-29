import { Flex, Text, VStack } from "@chakra-ui/react";
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
    <Flex
      flex="1"
      flexDir="column"
      alignItems="center"
      borderRadius={12}
      p={3}
      bg="gray.100"
      h="69%"
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

      <VStack overflow="scroll" overflowX="hidden" spacing={5}>
        {notifi.map((item, index) => (
          <NotificationsCard
            key={index}
            id={item.id}
            description={item.description}
          />
        ))}
      </VStack>
    </Flex>
  );
}
