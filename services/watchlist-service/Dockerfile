
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /watchlist-service

COPY *.csproj ./
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /out

FROM mcr.microsoft.com/dotnet/aspnet:8.0

WORKDIR /watchlist-service

COPY --from=build /out .

USER app

EXPOSE 8080

ENTRYPOINT ["dotnet", "WatchlistService.dll"]
