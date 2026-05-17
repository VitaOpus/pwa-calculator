# Создаем директорию schemas, если она не существует
mkdir -p ./api-schemas/schemas

# Удаляем старые схемы
rm -f ./schemas/calculator-service.json
echo "Схемы удалены"

# Добавляем новые схемы
echo "calculator-service"

curl https://php-service-calculator.vitaopus.ru/docs?api-docs.json > ./api-schemas/schemas/calculator-service.json

exit 0