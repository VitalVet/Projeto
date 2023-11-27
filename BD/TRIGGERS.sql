USE [BD23338]
GO
/****** Object:  Trigger [projeto].[AuditConsulta]    Script Date: 27/11/2023 16:38:55 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER TRIGGER [projeto].[AuditConsulta]
ON [projeto].[Consulta]
AFTER INSERT, UPDATE, DELETE
AS
BEGIN
    
    DECLARE @Operacao VARCHAR(10);
    SET @Operacao = CASE
        WHEN EXISTS (SELECT * FROM inserted) AND EXISTS (SELECT * FROM deleted) THEN 'UPDATE'
        WHEN EXISTS (SELECT * FROM inserted) THEN 'INSERT'
        WHEN EXISTS (SELECT * FROM deleted) THEN 'DELETE'
        ELSE NULL
    END;

    IF @Operacao IS NOT NULL
    BEGIN
        
        INSERT INTO projeto.AuditoriaConsulta (Operacao, DataHora,IdConsulta, IdPet, Valor, Assunto, Consultorio, DataConsulta, EhEmergencia)
        SELECT @Operacao, GETDATE(),IdConsulta, IdPet, Valor, Assunto, Consultorio, DataConsulta, EhEmergencia
        FROM deleted; 
    END;
END;